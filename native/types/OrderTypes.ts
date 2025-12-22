export type orderType = "BUY" | "SELL";
export type orderStatus = "COMPLETED" | "CANCELLED" | "REJECTED" | "PENDING";
export type tradeType = "CNC" | "MIS";
export type transactionType = "MARKET" | "LIMIT" | "ST-L";

export interface OrderResponse {
  orderType: orderType;
  orderStatus: orderStatus;
  tradeType: tradeType;
  transactionType: transactionType;
  symbol: string;
  quantity: number;
  exchangeSegment: string;
  createdAt: string;
  userId: string;
  price: number;
  token: string;
  limit: number;
  triggerPrice: number;
}
