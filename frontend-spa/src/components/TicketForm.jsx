import React from "react";

const emptyTicket = { titulo: "", descripcion: "", categoria: "Red", prioridad: "Media", estado: "Abierto" };

export default function TicketForm({ editingTicket, onSubmit, onCancel, submitting }) {
  const ticket = editingTicket || emptyTicket;

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onSubmit({
      titulo: form.get("titulo"),
      descripcion: form.get("descripcion"),
      categoria: form.get("categoria"),
      prioridad: form.get("prioridad"),
      estado: form.get("estado")
    }, event.currentTarget);
  }

  return (
    <section className="content-panel form-panel" id="nuevo" aria-labelledby="form-title">
      <div className="panel-heading">
        <div><p className="eyebrow">Gestion de casos</p><h2 id="form-title">{editingTicket ? "Editar ticket" : "Reportar incidente"}</h2></div>
        <span className="panel-icon" aria-hidden="true">+</span>
      </div>
      <form className="ticket-form" onSubmit={handleSubmit}>
        <label>Titulo del incidente<input name="titulo" defaultValue={ticket.titulo} minLength="3" maxLength="120" required placeholder="Ej. Intermitencia en la red" /></label>
        <label>Categoria<select name="categoria" defaultValue={ticket.categoria} required><option>Red</option><option>Hardware</option><option>Software</option></select></label>
        <label>Prioridad<select name="prioridad" defaultValue={ticket.prioridad} required><option>Alta</option><option>Media</option><option>Baja</option></select></label>
        <label>Estado<select name="estado" defaultValue={ticket.estado} required><option>Abierto</option><option>En Progreso</option><option>Cerrado</option></select></label>
        <label className="full-width">Descripcion<textarea name="descripcion" defaultValue={ticket.descripcion} minLength="10" maxLength="1000" rows="5" required placeholder="Describe el incidente, su alcance y las acciones realizadas." /></label>
        <div className="form-actions full-width">
          <button className="button button-primary" type="submit" disabled={submitting}>{submitting ? "Guardando..." : editingTicket ? "Guardar cambios" : "Crear ticket"}</button>
          {editingTicket && <button className="button button-secondary" type="button" onClick={onCancel}>Cancelar edicion</button>}
        </div>
      </form>
    </section>
  );
}
