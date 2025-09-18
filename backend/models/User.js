import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String },
  password: { type: String, required: true },
  otp: String,
  otpExpiry: Date,
  otpResendCount: { type: Number, default: 0 },
  otplockedUntil: Date,
  verified: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
