import { InstrumentDTO } from "types/Instrument";
import { OrderDTO, OrderEngineParams } from "../types/Order";
import { UserDTO } from "types/User";
import OrderModel from "@models/orderModel";
import userModel from "@models/userModel";
import InstrumentModel from "@models/instrumentModel";
import { tickMap } from "./ticks.service";
import { positionService } from "./position.service";

export const initExecution = async (order: OrderDTO) => {
  try {
    const tick = tickMap[order.token];
    console.log(tick)
    const user: UserDTO = await userModel.findById(order.userId);
    const instrument: InstrumentDTO = await InstrumentModel.findOne({
      token: order.token,
    });
    if (!user && !instrument) return;
    if (user.availableFunds < order.quantity * (tick?.last_traded_price / 100)) {
      await OrderModel.findByIdAndUpdate(order._id, {
        $set: { orderStatus: "REJECTED" },
      });
    }
    switch (order.transactionType) {
      case "MARKET":
        executeMarketOrder(order, instrument, user);
        return;

      case "LIMIT":
        executeLimitOrder(order, user, instrument, tick);
        return;

      case "ST-L":
        executeMarketOrder(order, instrument, user);
        executeStopLoss(order, user, instrument, tick);
        return;
    }
  } catch (error) {
    console.log(error);
  }
};

const executeMarketOrder = async (
  order: OrderDTO,
  instrument: InstrumentDTO,
  user: UserDTO
) => {
  try {
    await positionService({ order, instrument, user });
    await OrderModel.findByIdAndUpdate(order._id, {
      $set: { orderStatus: "COMPLETED" },
    });
  } catch (error) {
    console.log(error);
  }
};

const executeLimitOrder = async (
  order: OrderDTO,
  user: UserDTO,
  instrument: InstrumentDTO,
  tick: any
) => {
  try {
    if (tick.last_traded_price === order.limit) {
      await positionService({ order, instrument, user });
      await OrderModel.findByIdAndUpdate(order._id, {
        $set: { orderStatus: "COMPLETED" },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const executeStopLoss = async (
  order: OrderDTO,
  user: UserDTO,
  instrument: InstrumentDTO,
  tick: any
) => {
  try {
    if (tick.last_traded_price === order.triggerPrice) {
      await positionService({ order, instrument, user });
      await OrderModel.findByIdAndUpdate(order._id, {
        $set: { orderStatus: "COMPLETED" },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const executeIntradayOrder = async () => {
  try {
    const orders = await OrderModel.find({
      orderStatus: "COMPLETED",
      tradeType: "MIS",
    });
    orders.forEach(async (order) => {
      await executeExit(order);
    });
  } catch (error) {
    console.log(error);
  }
};

export const executeExit = async (order: OrderDTO) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
