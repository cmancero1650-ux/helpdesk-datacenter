import { Ticket } from "../models/Ticket.js";

export async function listTickets(_req, res, next) {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    return res.json(tickets);
  } catch (error) {
    return next(error);
  }
}

export async function getTicketById(req, res, next) {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    return res.json(ticket);
  } catch (error) {
    return next(error);
  }
}

export async function createTicket(req, res, next) {
  try {
    const ticket = await Ticket.create(req.body);
    return res.status(201).json(ticket);
  } catch (error) {
    return next(error);
  }
}

export async function updateTicket(req, res, next) {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    return res.json(ticket);
  } catch (error) {
    return next(error);
  }
}

export async function deleteTicket(req, res, next) {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
