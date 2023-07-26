import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import { isAuthenticated } from "./middlewares/auth.js";
import { sendCookie } from "./utils/features.js";

export const app = express();

config({
  path: "./data/config.env",
});

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", isAuthenticated, (req, res) => {
  try {
    sendCookie(req.user , res, `Welcome back, ${req.user.name}`, 200);
  } catch (error) {
    next(error);
  }
});

// Using Error Middleware
app.use(errorMiddleware);
