import { Router } from "express";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

const router = Router();

// KEYS
const JWT_key = "1234567890";

// Register Controller
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists. Please choose a different one.",
      });
    }

    const user = new User({ username, password });
    const createdUser = await user.save();

    jwt.sign({ userId: createdUser._id }, JWT_key, {}, (err, token) => {
      if (err) throw err;

      res
        .status(201)
        .cookie("token", token)
        .json({ user: createdUser, message: "User registered successfully." });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
