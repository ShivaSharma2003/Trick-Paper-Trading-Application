import { Model } from "mongoose";
import { UserDTO } from "types/User";
import bcrypt from "bcryptjs";
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    adhaarNumber: { type: String },
    availableFunds: { type: Number, required: true },
    brokerId : {type : String},
    email: { type: String },
    optMargin: { type: Number, required: true },
    futMargin: { type: Number, required: true },
    pancardNumber: { type: String },
    phoneNumber: { type: String },
    role: { type: String, default: "USER"},
    userName: { type: String },
    isDemoId : {type : Boolean , default : true},
    isAccountBlocked : {type : Boolean , default: false},
  },
  { timestamps: true },
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
