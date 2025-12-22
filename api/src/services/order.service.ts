import { OrderDTO, OrderEngineParams } from "types/Order";
import InstrumentModel from "@models/instrumentModel";
import OrderModel from "@models/orderModel";
import { tickMap } from "@services/ticks.service";
import userModel from "@models/userModel";

export const OrderCreateEngine = async ({
  lotQuantity,
  orderType,
  token,
  tradeType,
  transactionType,
  limit,
  triggerPrice,
  userId,
}: OrderEngineParams) => {
  try {
    let order: OrderDTO;
    const item = tickMap.get(token);
    const user = await userModel.findById(userId);
    const instrument = await InstrumentModel.findOne({ token });
    if (!instrument) return false;

    switch (transactionType) {
      case "MARKET":
        order = await OrderModel.create({
          exchangeSegment: instrument.exchangeSegment,
          instrumentType: instrument.instrumentType,
          name: instrument.name,
          orderStatus: "PENDING",
          quantity: lotQuantity * instrument.lotSize,
          orderType: orderType,
          price: item?.last_traded_price / 100,
          symbol: instrument.symbol,
          token: instrument.token,
          tradeType: tradeType,
          userId: user._id,
          transactionType: transactionType,
          limit: null,
          triggerPrice: null,
        });
        return order;

      case "LIMIT":
        order = await OrderModel.create({
          exchangeSegment: instrument.exchangeSegment,
          instrumentType: instrument.instrumentType,
          name: instrument.name,
          orderStatus: "PENDING",
          quantity: lotQuantity * instrument.lotSize,
          orderType: orderType,
          price: item?.last_traded_price / 100,
          symbol: instrument.symbol,
          token: instrument.token,
          tradeType: tradeType,
          userId: user._id,
          transactionType: transactionType,
          limit: limit,
          triggerPrice: null,
        });
        return order;
      case "ST-L":
        order = await OrderModel.create({
          exchangeSegment: instrument.exchangeSegment,
          instrumentType: instrument.instrumentType,
          name: instrument.name,
          orderStatus: "PENDING",
          quantity: lotQuantity * instrument.lotSize,
          orderType: orderType,
          price: item?.last_traded_price / 100,
          symbol: instrument.symbol,
          token: instrument.token,
          tradeType: tradeType,
          userId: user._id,
          transactionType: transactionType,
          limit: null,
          triggerPrice: triggerPrice,
        });
        return order;
    }
  } catch (error) {
    console.log(error);
  }
};
