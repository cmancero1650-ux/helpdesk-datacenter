import { query } from "../config/database.js";
import { validateTicketPayload } from "../models/Ticket.js";

function mapTicket(row) {
  return {
    id: row.id,
    titulo: row.titulo,
    descripcion: row.descripcion,
    categoria: row.categoria,
    prioridad: row.prioridad,
    estado: row.estado,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function listTickets(_req, res, next) {
  try {
    const result = await query(
      `SELECT id, titulo, descripcion, categoria, prioridad, estado, created_at, updated_at
       FROM tickets
       ORDER BY created_at DESC`
    );

    return res.json(result.rows.map(mapTicket));
  } catch (error) {
    return next(error);
  }
}

export async function getTicketById(req, res, next) {
  try {
    const result = await query(
      `SELECT id, titulo, descripcion, categoria, prioridad, estado, created_at, updated_at
       FROM tickets
       WHERE id = $1`,
      [req.params.id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    return res.json(mapTicket(result.rows[0]));
  } catch (error) {
    return next(error);
  }
}

export async function createTicket(req, res, next) {
  try {
    const errors = validateTicketPayload(req.body);
    if (errors.length) {
      return res.status(400).json({ message: "Datos invalidos", details: errors });
    }

    const result = await query(
      `INSERT INTO tickets (titulo, descripcion, categoria, prioridad, estado)
       VALUES ($1, $2, $3, $4, COALESCE($5, 'Abierto'))
       RETURNING id, titulo, descripcion, categoria, prioridad, estado, created_at, updated_at`,
      [
        req.body.titulo.trim(),
        req.body.descripcion.trim(),
        req.body.categoria,
        req.body.prioridad,
        req.body.estado
      ]
    );

    return res.status(201).json(mapTicket(result.rows[0]));
  } catch (error) {
    return next(error);
  }
}

export async function updateTicket(req, res, next) {
  try {
    const errors = validateTicketPayload(req.body, { partial: true });
    if (errors.length) {
      return res.status(400).json({ message: "Datos invalidos", details: errors });
    }

    const current = await query("SELECT * FROM tickets WHERE id = $1", [req.params.id]);
    if (!current.rows[0]) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    const ticket = {
      ...current.rows[0],
      ...req.body
    };

    const result = await query(
      `UPDATE tickets
       SET titulo = $1,
           descripcion = $2,
           categoria = $3,
           prioridad = $4,
           estado = $5,
           updated_at = NOW()
       WHERE id = $6
       RETURNING id, titulo, descripcion, categoria, prioridad, estado, created_at, updated_at`,
      [
        ticket.titulo.trim(),
        ticket.descripcion.trim(),
        ticket.categoria,
        ticket.prioridad,
        ticket.estado,
        req.params.id
      ]
    );

    return res.json(mapTicket(result.rows[0]));
  } catch (error) {
    return next(error);
  }
}

export async function deleteTicket(req, res, next) {
  try {
    const result = await query("DELETE FROM tickets WHERE id = $1 RETURNING id", [req.params.id]);

    if (!result.rows[0]) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
