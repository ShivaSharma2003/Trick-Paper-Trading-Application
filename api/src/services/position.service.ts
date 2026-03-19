import PositionModel from "@models/positionModel";
import userModel from "@models/userModel";
import { PositionDTO, PositionParams } from "types/position";
import { tickMap } from "@config/smartAPI";
import { redis } from "@config/redis.config";
import { futures, InstrumentDTO, options } from "../types/instrument";

export const loadPositionsFromRedis = async () => {
  const keys = await redis.keys("trick:positions:*");

  for (const key of keys) {
    const data = await redis.hGetAll(key);
    for (const token in data) {
      const pos: PositionDTO = JSON.parse(data[token]);
    }
  }

  console.log("Positions restored from Redis");
};

loadPositionsFromRedis();

/**
 * Redis helpers
 */
const redisKey = (userId: string) => `trick:positions:${userId}`;

const savePosition = async (
  userId: string,
  token: string,
  position: PositionDTO,
) => {
  await redis.hSet(redisKey(userId), token, JSON.stringify(position));
};

const removePosition = async (userId: string, token: string) => {
  await redis.hDel(redisKey(userId), token);
};

const getPosition = async (
  userId: string,
  token: string,
): Promise<PositionDTO | null> => {
  const data = await redis.hGet(redisKey(userId), token);
  return data ? JSON.parse(String(data)) : null;
};

/**
 * MAIN SERVICE
 */
export const positionService = async ({
  user,
  instrument,
  order,
}: PositionParams) => {
  const tick = tickMap.get(order.token);
  if (!tick) throw new Error("Tick not found");

  const ltp = Number(tick?.last_traded_price ?? 0);

  let orderMargin = 0;
  let orderBrokerage = 0;

  if (options.has(instrument.instrumentType)) {
    orderMargin =
      ((ltp / 100) * order.quantity) / user.optMargin;

    orderBrokerage = order.quantity * user.optBrokerage;
  }

  if (futures.has(instrument.instrumentType)) {
    orderMargin = user.futMargin * order.quantity;
    orderBrokerage = order.quantity * user.futBrokerage;
  }

  const totalAmount = orderMargin + orderBrokerage;
  const userId = String(user._id);
  const token = instrument.token;

  const existedPosition = await getPosition(userId, token);

  /**
   * NEW POSITION
   */
  if (!existedPosition) {
    const position: PositionDTO = {
      userId,
      token,
      instrument,
      quantity: order.quantity,
      symbol: order.symbol,
      type: order.orderType,
      createdAt: new Date(),
      exitedAt: null,
      orderBrokerage: orderBrokerage,
      orderMargin: orderMargin,
      totalOrderAmount: orderBrokerage + orderMargin,
      average: order.price,
      exitedAverage: null,
      status: "ACTIVE",
      tradeType: order.tradeType,
      exchangeSegment: order.exchangeSegment,
    };

    await savePosition(userId, token, position);

    await userModel.findByIdAndUpdate(userId, {
      $inc: { availableFunds: -totalAmount },
    });

    return;
  }

  /**
   * SAME SIDE (BUY+BUY or SELL+SELL)
   */
  if (existedPosition.type === order.orderType) {
    existedPosition.quantity += order.quantity;
    existedPosition.orderMargin += orderMargin;
    existedPosition.orderBrokerage += orderBrokerage;
    existedPosition.average =
      (existedPosition.average * existedPosition.quantity +
        order.price * order.quantity) /
      (existedPosition.quantity + order.quantity);

    await savePosition(userId, token, existedPosition);

    await userModel.findByIdAndUpdate(userId, {
      $inc: { availableFunds: -totalAmount },
    });

    return;
  }

  /**
   * OPPOSITE SIDE (EXIT / PARTIAL / REVERSE)
   */
  const netQty = existedPosition.quantity - order.quantity;

  // FULL EXIT
  if (netQty === 0) {
    existedPosition.status = "EXITED";
    existedPosition.exitedAt = new Date();
    existedPosition.exitedAverage = order.price;

    await PositionModel.create(existedPosition);
    await removePosition(userId, token);

    await userModel.findByIdAndUpdate(userId, {
      $inc: {
        availableFunds:
          (existedPosition.exitedAverage - existedPosition.average) *
            existedPosition.quantity +
          existedPosition.orderMargin -
          orderBrokerage,
      },
    });

    return;
  }

  // REVERSE POSITION
  // if (netQty < 0) {
  //   const leftQty = Math.abs(netQty);

  //   existedPosition.status = "EXITED";
  //   existedPosition.exitedAt = new Date();
  //   existedPosition.exitedAverage = order.price;

  //   await PositionModel.create(existedPosition);
  //   await removePosition(userId, token);

  //   const newPosition: PositionDTO = {
  //     userId,
  //     token,
  //     instrument,
  //     quantity: leftQty,
  //     symbol: order.symbol,
  //     type: order.orderType,
  //     createdAt: new Date(),
  //     exitedAt: null,
  //     totalAmount: order.price * leftQty,
  //     average: order.price,
  //     exitedAverage: null,
  //     status: "ACTIVE",
  //     tradeType: order.tradeType,
  //     exchangeSegment: order.exchangeSegment,
  //   };

  //   await savePosition(userId, token, newPosition);

  //   await userModel.findByIdAndUpdate(userId, {
  //     $inc: {
  //       availableFunds: -(order.price * leftQty - brokerage),
  //     },
  //   });

  //   return;
  // }

  // PARTIAL EXIT
  // existedPosition.quantity = netQty;
  // existedPosition.totalAmount -= order.price * order.quantity;
  // existedPosition.average =
  //   existedPosition.totalAmount / existedPosition.quantity;

  // // STORE PARTIAL EXIT IN DB
  // await PositionModel.create({
  //   ...existedPosition,
  //   quantity: order.quantity, // exited qty only
  //   exitedAt: new Date(),
  //   exitedAverage: order.price,
  //   status: "EXITED",
  // });

  // await savePosition(userId, token, existedPosition);

  // await userModel.findByIdAndUpdate(userId, {
  //   $inc: {
  //     availableFunds: order.price * order.quantity - brokerage,
  //   },
  // });
};
