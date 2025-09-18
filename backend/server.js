
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import cors from "cors";
import { sendEmail } from "./sendEmail.js";
import PendingUser from "./models/PendingUser.js";
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://task-manager-rose-phi.vercel.app",
  credentials: true
}));



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.post("/signUp", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    if (await User.findOne({ email: normalizedEmail })) {
      return res.status(400).json({ error: "Email already registered" });
    }

    let pending = await PendingUser.findOne({ email: normalizedEmail });

    if (pending && pending.blockExpiry && pending.blockExpiry > Date.now()) {
      return res.status(400).json({
        error: "Too many OTP requests. Try again later."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    if (!pending) {
      pending = new PendingUser({
        firstName,
        lastName,
        email: normalizedEmail,
        password: hashedPassword,
        otp,
        otpExpiry,
        resendCount: 0,
        blockExpiry: null,
      });
    } else {
      pending.firstName = firstName;
      pending.lastName = lastName;
      pending.password = hashedPassword;
      pending.otp = otp;
      pending.otpExpiry = otpExpiry;
    }

    await pending.save();

    await sendEmail(
      normalizedEmail,
      "Your OTP CODE",
      `Your OTP is ${otp}. It expires in 5 minutes.`
    );

    res.json({ message: "Registered successfully. Please verify OTP.", email: normalizedEmail });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!existingUser.verified) {
      return res.status(400).json({ error: "Please verify your email first" });
    }

    console.log(existingUser.password)

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    res.status(200).json({ message: "Login successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: "Email and OTP required" });

    const normalizedEmail = email.toLowerCase();
    const pendingUser = await PendingUser.findOne({ email: normalizedEmail });
    if (!pendingUser) return res.status(400).json({ error: "No pending signup found." });

    if (pendingUser.otp !== otp || pendingUser.otpExpiry < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const newUser = new User({
      firstName: pendingUser.firstName,
      lastName: pendingUser.lastName,
      email: pendingUser.email,
      password: pendingUser.password,
      verified: true,
    });

    await newUser.save();
    await PendingUser.deleteOne({ email: normalizedEmail });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });



    res.json({ message: "OTP verified successfully. Account created!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const normalizedEmail = email.toLowerCase();

    const pending = await PendingUser.findOne({ email: normalizedEmail });
    if (!pending) return res.status(400).json({ error: "No pending signup found." });

    if (pending.blockExpiry && pending.blockExpiry > Date.now()) {
      return res.status(400).json({ error: "Too many OTP requests. Try again later." });
    }

    pending.resendCount += 1;

    if (pending.resendCount > 3) {
      pending.blockExpiry = new Date(Date.now() + 60 * 60 * 1000);
      await pending.save();
      return res.status(400).json({ error: "Too many OTP requests. Try again in 1 hour." });
    }

    pending.otp = Math.floor(1000 + Math.random() * 9000).toString();
    pending.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await pending.save();
    await sendEmail(
      normalizedEmail,
      "Your OTP CODE",
      `Your new OTP is ${pending.otp}. It expires in 5 minutes.`
    );

    res.json({ message: "OTP resent successfully.", resendCount: pending.resendCount });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};


app.post("/username", authMiddleware, async (req, res) => {
  try {
    const { username } = req.body;

    const existingUser = await User.findOne({ username, _id: { $ne: req.userId } });
    if (existingUser) return res.status(400).json({ error: "Username already taken" });


    const user = await User.findByIdAndUpdate(
      req.userId,
      { username },
      { new: true }
    );

    res.json({ message: "Username updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/userInfo", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("username email")
    if (!user) return res.json(400).json({ error: "User not found" })

    res.json(user);
  } catch (error) {
    console.log(error);
  }
})

app.listen(process.env.PORT || 5000, () => console.log("Server running"));
