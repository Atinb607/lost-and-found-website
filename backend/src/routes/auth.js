import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, roll, email, password } = req.body || {};
    
    if (!name || !roll || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Check if roll number already exists
    const rollExists = await User.findOne({ roll });
    if (rollExists) {
      return res.status(409).json({ message: "Roll number already registered" });
    }

    const user = await User.create({ name, roll, email, password });

    const token = signToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json({
        user: { 
          id: user._id, 
          name: user.name, 
          roll: user.roll, 
          email: user.email 
        },
        token
      });

  } catch (e) {
    console.error("Signup error:", e);
    
    // Handle duplicate key errors specifically
    if (e.code === 11000) {
      const field = Object.keys(e.keyPattern)[0];
      return res.status(409).json({ 
        message: `${field === 'roll' ? 'Roll number' : 'Email'} already exists` 
      });
    }
    
    res.status(500).json({ message: "Server error" });
  }
});

// Login (unchanged, but updated response to include roll)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await user.matchPassword(password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json({ 
        user: { 
          id: user._id, 
          name: user.name, 
          roll: user.roll, 
          email: user.email 
        }, 
        token 
      });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Me (updated to include roll in response)
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization?.split(" ")[1];
    const token = authHeader || req.cookies?.token;

    if (!token) return res.status(200).json({ user: null });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    res.json({ user: user || null });

  } catch {
    res.status(200).json({ user: null });
  }
});

// Logout (unchanged)
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});

export default router;
