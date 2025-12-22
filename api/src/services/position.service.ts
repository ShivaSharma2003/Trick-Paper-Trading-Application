import PositionModel from "@models/positionModel";
import userModel from "@models/userModel";
import { PositionDTO, PositionParams } from "types/position";
import { tickMap } from "./ticks.service";

export let positionMap = new Map<string, PositionDTO>();

setInterval(() => {
  console.log(positionMap);
}, 5000);

export const positionService = async ({
  user,
  instrument,
  order,
}: PositionParams) => {
  const tick = tickMap.get(order.token);
  let margin: number =
    ((Number(tick?.last_traded_price) / 100) *
      (order.quantity / instrument.lotSize)) /
    user.margin;
  let brokerage: number =
    ((Number(tick?.last_traded_price) / 100) *
      (order.quantity / instrument.lotSize)) /
    100;
  let totalAmount: number = margin + brokerage;
  if (!positionMap.has(`${user._id}:${instrument.token}`)) {
    positionMap.set(`${user._id}:${instrument.token}`, {
      userId: String(user._id),
      token: instrument.token,
      quantity: order.quantity,
      symbol: order.symbol,
      type: order.orderType,
      createdAt: new Date(),
      exitedAt: null,
      totalAmount: order.price * order.quantity,
      average: order.price,
      exitedAverage: null,
      status: "ACTIVE",
    });
    await userModel.findByIdAndUpdate(user._id, {
      $inc: { availableFunds: -totalAmount },
    });
  } else {
    const existedPosition = positionMap.get(`${user._id}:${instrument.token}`);

    if (existedPosition?.type === order.orderType) {
      existedPosition.quantity = existedPosition.quantity + order.quantity;
      existedPosition.totalAmount =
        existedPosition.totalAmount + order.price * order.quantity;
      existedPosition.average =
        existedPosition.totalAmount / existedPosition.quantity;
      await userModel.findByIdAndUpdate(user._id, {
        $inc: { availableFunds: -totalAmount },
      });
    } else {
      if (existedPosition.quantity - order.quantity === 0) {
        existedPosition.status = "EXITED";
        existedPosition.exitedAt = new Date();
        existedPosition.exitedAverage = order.price;
        // Save this Position in DB or Redis
        await PositionModel.create({
          userId: existedPosition.userId,
          token: existedPosition.token,
          quantity: existedPosition.quantity,
          symbol: existedPosition.symbol,
          type: existedPosition.type,
          createdAt: existedPosition.createdAt,
          exitedAt: existedPosition.exitedAt,
          average: existedPosition.average,
          exitedAverage: existedPosition.exitedAt,
          status: existedPosition.status,
        });
        await userModel.findByIdAndUpdate(user._id, {
          $inc: {
            availableFunds:
              existedPosition.exitedAverage * existedPosition.quantity -
              brokerage,
          },
        });
      } else if (existedPosition.quantity - order.quantity < 0) {
        const leftQty = order.quantity - existedPosition.quantity;

        existedPosition.status = "EXITED";
        existedPosition.exitedAt = new Date();
        existedPosition.exitedAverage = order.price;
        // Save this Position in DB or Redis
        await PositionModel.create({
          userId: existedPosition.userId,
          token: existedPosition.token,
          quantity: existedPosition.quantity,
          symbol: existedPosition.symbol,
          type: existedPosition.type,
          createdAt: existedPosition.createdAt,
          exitedAt: existedPosition.exitedAt,
          average: existedPosition.average,
          exitedAverage: existedPosition.exitedAt,
          status: existedPosition.status,
        });
        await userModel.findByIdAndUpdate(user._id, {
          $inc: {
            availableFunds:
              existedPosition.exitedAverage * existedPosition.quantity -
              brokerage,
          },
        });

        // Now New Positionw ill be created here
        positionMap.set(`${user._id}:${instrument.token}`, {
          userId: String(user._id),
          token: instrument.token,
          quantity: leftQty,
          symbol: order.symbol,
          type: order.orderType,
          createdAt: new Date(),
          exitedAt: null,
          totalAmount: order.price * leftQty,
          average: order.price,
          exitedAverage: null,
          status: "ACTIVE",
        });
        await userModel.findByIdAndUpdate(user._id, {
          $inc: {
            availableFunds: -(order.price * leftQty - brokerage),
          },
        });
      } else {
        existedPosition.quantity = existedPosition.quantity - order.quantity;
        existedPosition.totalAmount =
          existedPosition.totalAmount - order.price * order.quantity;
        existedPosition.average =
          existedPosition.totalAmount / existedPosition.quantity;

        await userModel.findByIdAndUpdate(user._id, {
          $inc: {
            availableFunds: order.price * order.quantity - brokerage,
          },
        });
      }
    }
  }
};
