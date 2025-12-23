import { Model, model, Schema } from "mongoose";
import { PositionDTO } from "types/position";

const mongoose = require("mongoose");

const PositionSchema = new mongoose.Schema(
  {
    userId: { type: String, requried: true },
    token: { type: String, required: true },
    quantity: { type: Number, required: true },
    symbol: { type: String, requried: true },
    type: { type: String, required: true },
    createdAt: { type: Date, required: true },
    exitedAt: { type: Date, requried: true },
    average: { type: Number, required: true },
    exitedAverage: { type: Number, required: true },
    status: { type: String, requried: true },
    tradeType: { type: String, required: true },
  },
  { timeStamps: true }
);

const PositionModel = model("position", PositionSchema);
export default PositionModel;
