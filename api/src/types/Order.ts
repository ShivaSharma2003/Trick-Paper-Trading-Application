import { Schema } from "mongoose";

export type orderType = "BUY" | "SELL";
type transactionType = "MARKET" | "LIMIT" | "ST-L";
export type tradeType = "MIS" | "CNC";
type orderStatus = "PENDING"| "COMPLETED"| "CANCELLED"| "REJECTED";

export interface OrderDTO {
  userId: Schema.Types.ObjectId;
  token: string;
  quantity: number;
  symbol: string;
  name: string;
  exchangeSegment: string;
  instrumentType: string;
  price: number;
  orderType: orderType;
  tradeType: tradeType;
  transactionType: transactionType;
  orderStatus: orderStatus;
  triggerPrice: number;
  limit: number;
  _id : Schema.Types.ObjectId
}

export interface OrderEngineParams {
  tradeType: tradeType;
  orderType: orderType;
  transactionType: transactionType;
  token: string;
  lotQuantity: number;
  limit?: number;
  triggerPrice?: number;
  userId: string;
}
