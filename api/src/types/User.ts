import { Schema } from "mongoose";

export type userRole = "USER" | "ADMIN" | "BROKER";

export interface UserDTO {
  _id: Schema.Types.ObjectId;
  userId: string;
  userName: string;
  password: string;
  role: userRole;
  email: string;
  phoneNumber: string;
  adhaarNumber: string;
  pancardNumber: string;
  optMargin: number;
  futMargin: number;
  optBrokerage: number;
  futBrokerage: number;
  availableFunds: number;
  brokerId: any;
  isDemoId: boolean;
  isAccountBlocked: boolean;
  comparePassword: (password: string) => boolean;
}

export interface AdminDTO {
  _id: Schema.Types.ObjectId;
  userId: string;
  password: string;
  role: string;
  userName: string;
  comparePassword: (password: string) => boolean;
}

export interface BrokerDTO {
  _id: Schema.Types.ObjectId;
  userId: string;
  password: string;
  role: string;
  userName: string;
  comparePassword: (password: string) => boolean;
}
