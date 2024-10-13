import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { WebSocketServer as WSWebSocketServer } from "ws";

import AuthRouter from "./controllers/auth.controller.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// KEYS
const JWT_key = "1234567890";

// Routes
app.use("/api/auth", AuthRouter);

// Database Connection and Server Connection
mongoose.connect("mongodb://127.0.0.1:27017/chat-web-app");
const server = app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

const wss = new WSWebSocketServer({ server });
wss.on("connection", (connection, req) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    console.log("No cookies");
  }

  const tokenCookieString = cookies
    .split(";")
    .find((str) => str.startsWith("token="));
  if (!tokenCookieString) {
    console.log("No token cookie");
    return;
  }

  const token = tokenCookieString.split("=")[1];
  jwt.verify(token, JWT_key, {}, (error, userData) => {
    if (error) throw error;

    const { userId } = userData;
    connection.userId = userId;
  });

  [...wss.clients].forEach((client) => {
    client.send(
      JSON.stringify({
        online: [...wss.clients].map((client) => ({ userId: client.userId })),
      })
    );
  });
});
