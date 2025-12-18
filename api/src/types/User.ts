type userRole = "USER" | "ADMIN";

export interface UserDTO {
  userId: string;
  userName: string;
  password: string;
  role: userRole;
  email: string;
  phoneNumber: string;
  adhaarNumber: string;
  pancardNumber: string;
  margin: number;
  availableFunds: number;
}
