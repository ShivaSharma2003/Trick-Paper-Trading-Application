import { orderType, tradeType } from "./OrderTypes";

type positionStatus = "ACTIVE" | "EXITED";

export interface PositionResponse {
  userId: string;
  token: string;
  quantity: number;
  symbol: string;
  type: orderType;
  createdAt: Date;
  exitedAt: Date | null;
  totalAmount: number;
  average: number;
  exitedAverage: number | null;
  status: positionStatus;
  tradeType: tradeType;
  exchangeSegment: string;
}
