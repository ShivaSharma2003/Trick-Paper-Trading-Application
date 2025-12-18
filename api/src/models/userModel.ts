import { Model } from "mongoose";
import { UserDTO } from "types/User";
import bcrypt from "bcryptjs";
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index : true, unique: true },
    password: { type: String, required: true },
    adhaarNumber: { type: String },
    availableFunds: { type: Number, default: 10000 },
    email: { type: String },
    margin: { type: Number, default: 1 },
    pancardNumber: { type: String },
    phoneNumber: { type: String },
    role: { type: String, default: "USER" },
    userName: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next;
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema) as Model<UserDTO>;

export default userModel;
