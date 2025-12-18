import { InstrumentDTO } from "types/instrument";
import { Model } from "mongoose";
const mongoose = require("mongoose");

const InstrumentSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    symbol: { type: String, required: true},
    name: { type: String },
    expiry: { type: String },
    exchangeSegment: { type: String, required: true },
    instrumentType: { type: String },
    lotSize: { type: Number, required: true },
  },
  { timestamps: true }
);

const InstrumentModel = mongoose.model("instrument", InstrumentSchema) as Model<
  InstrumentDTO | Document
>;
export default InstrumentModel;
