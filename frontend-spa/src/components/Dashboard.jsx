import React from "react";

export default function Dashboard({ tickets, onRefresh, loading }) {
  const open = tickets.filter((ticket) => ticket.estado === "Abierto").length;
  const progress = tickets.filter((ticket) => ticket.estado === "En Progreso").length;
  const closed = tickets.filter((ticket) => ticket.estado === "Cerrado").length;
  const high = tickets.filter((ticket) => ticket.prioridad === "Alta" && ticket.estado !== "Cerrado").length;

  return (
    <section className="dashboard-section" id="inicio" aria-labelledby="dashboard-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Panel de control</p>
          <h1 id="dashboard-title">Resumen de incidentes</h1>
          <p className="section-description">Supervisa el estado de la operacion y atiende los casos prioritarios.</p>
        </div>
        <button className="button button-secondary" type="button" onClick={onRefresh} disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar datos"}
        </button>
      </div>

      <div className="stats-grid" aria-label="Resumen de tickets">
        <article className="stat-card stat-blue"><span>Tickets abiertos</span><strong>{open}</strong><small>Requieren atencion</small></article>
        <article className="stat-card stat-amber"><span>En progreso</span><strong>{progress}</strong><small>En seguimiento tecnico</small></article>
        <article className="stat-card stat-green"><span>Tickets cerrados</span><strong>{closed}</strong><small>Casos resueltos</small></article>
        <article className="stat-card stat-red"><span>Prioridad alta</span><strong>{high}</strong><small>Sin resolver</small></article>
      </div>
    </section>
  );
}
