import { Types } from "mongoose";
import { InstrumentDTO } from "./instrument";
import { OrderDTO, orderType, tradeType } from "./Order";
import { UserDTO } from "./User";

type positionStatus = "ACTIVE" | "EXITED";

export interface PositionParams {
  user: UserDTO;
  instrument: InstrumentDTO;
  order: OrderDTO;
}

export interface PositionDTO {
  userId: string;
  token: string;
  instrument: InstrumentDTO;
  quantity: number;
  symbol: string;
  type: orderType;
  createdAt: Date;
  exitedAt: Date | null;
  average: number;
  exitedAverage: number | null;
  status: positionStatus;
  tradeType: tradeType;
  exchangeSegment: string;
  orderMargin: number;
  orderBrokerage: number;
  totalOrderAmount: number;
}
