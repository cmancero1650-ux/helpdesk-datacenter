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

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*"
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
