import React from "react";

const priorityClass = { Alta: "priority-high", Media: "priority-medium", Baja: "priority-low" };

export default function TicketList({ tickets, onEdit, onDelete, deletingId }) {
  return (
    <section className="content-panel" id="tickets" aria-labelledby="tickets-title">
      <div className="panel-heading"><div><p className="eyebrow">Operacion</p><h2 id="tickets-title">Tickets registrados</h2></div><span className="ticket-count">{tickets.length} casos</span></div>
      {tickets.length === 0 ? <p className="empty-state">No hay tickets registrados.</p> : <div className="ticket-table-wrap"><table className="ticket-table"><caption className="sr-only">Listado de incidentes</caption><thead><tr><th scope="col">Incidente</th><th scope="col">Categoria</th><th scope="col">Prioridad</th><th scope="col">Estado</th><th scope="col"><span className="sr-only">Acciones</span></th></tr></thead><tbody>{tickets.map((ticket) => <tr key={ticket.id}><td data-label="Incidente"><strong>{ticket.titulo}</strong><span>{ticket.descripcion}</span></td><td data-label="Categoria">{ticket.categoria}</td><td data-label="Prioridad"><span className={`priority ${priorityClass[ticket.prioridad]}`}>{ticket.prioridad}</span></td><td data-label="Estado"><span className="status">{ticket.estado}</span></td><td className="row-actions"><button className="button button-small button-secondary" type="button" onClick={() => onEdit(ticket)}>Editar</button><button className="button button-small button-danger" type="button" onClick={() => onDelete(ticket.id)} disabled={deletingId === ticket.id}>{deletingId === ticket.id ? "..." : "Eliminar"}</button></td></tr>)}</tbody></table></div>}
    </section>
  );
}
