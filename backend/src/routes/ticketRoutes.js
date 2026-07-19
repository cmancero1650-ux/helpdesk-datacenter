import { Router } from "express";
import {
  createTicket,
  deleteTicket,
  getTicketById,
  listTickets,
  updateTicket
} from "../controllers/ticketController.js";
import { requireAuth } from "../middleware/auth.js";

export const ticketRouter = Router();

ticketRouter.use(requireAuth);
ticketRouter.get("/", listTickets);
ticketRouter.get("/:id", getTicketById);
ticketRouter.post("/", createTicket);
ticketRouter.put("/:id", updateTicket);
ticketRouter.delete("/:id", deleteTicket);
