import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

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

// Routes
app.use("/api/auth", AuthRouter);

// Database Connection and Server Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/chat-web-app")
  .then(() => {
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
