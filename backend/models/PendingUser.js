import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  otp: String,
  otpExpiry: Date,
  resendCount: { type: Number, default: 0 },
  blockExpiry: { type: Date, default: null },
});

export default mongoose.model("PendingUser", pendingUserSchema, "pendingusers");
