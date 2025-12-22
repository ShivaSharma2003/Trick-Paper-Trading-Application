import { Model, Schema, model } from "mongoose";
import { OrderDTO } from "types/Order";
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    token: { type: String, requried: true },
    exchangeSegment: { type: String, required: true },
    instrumentType: { type: String },
    name: { type: String, required: true },
    orderStatus: { type: String, required: true, },
    orderType: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    symbol: { type: String, requried: true },
    tradeType: { type: String, requried: true },
    transactionType: { type: String, requried: true },
    triggerPrice: { type: Number, default: null },
    limit: { type: Number, default: null },
  },
  { timestamps: true }
);

const OrderModel = model("order", OrderSchema) as Model<OrderDTO>;

export default OrderModel;
