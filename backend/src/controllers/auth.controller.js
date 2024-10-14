import { Router } from "express";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

const router = Router();

// KEYS
const JWT_key = "1234567890";

// Profile Controller
router.get("/profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized." });

    const decoded = jwt.verify(token, JWT_key);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized." });
  }
});

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

    jwt.sign(
      { userId: createdUser._id, username: createdUser.username },
      JWT_key,
      {},
      (err, token) => {
        if (err) throw err;

        res.status(201).cookie("token", token).json({
          user: createdUser,
          message: "User registered successfully.",
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Login Controller
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user || user.password === password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    jwt.sign(
      { userId: user._id, username: user.username },
      JWT_key,
      {},
      (err, token) => {
        if (err) throw err;

        res
          .status(201)
          .cookie("token", token)
          .json({ user, message: "User Logged In successfully." });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
