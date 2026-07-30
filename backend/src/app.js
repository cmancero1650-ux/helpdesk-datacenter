import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { authRouter } from "./routes/authRoutes.js";
import { ticketRouter } from "./routes/ticketRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

export const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "*")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origen no permitido por CORS"));
  }
}));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "helpdesk-api" });
});

app.use("/auth", authRouter);
app.use("/tickets", ticketRouter);

app.use(notFound);
app.use(errorHandler);
