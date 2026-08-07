import React, { useEffect, useState } from "react";

const emptyTicket = { titulo: "", descripcion: "", categoria: "Red", prioridad: "Media", estado: "Abierto" };

export default function TicketForm({ editingTicket, onSubmit, onCancel, submitting }) {
  const [formData, setFormData] = useState({ ...emptyTicket });

  useEffect(() => {
    setFormData(editingTicket ? {
      titulo: editingTicket.titulo || "",
      descripcion: editingTicket.descripcion || "",
      categoria: editingTicket.categoria || "Red",
      prioridad: editingTicket.prioridad || "Media",
      estado: editingTicket.estado || "Abierto"
    } : { ...emptyTicket });
  }, [editingTicket]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <section className="content-panel form-panel" id="nuevo" aria-labelledby="form-title">
      <div className="panel-heading">
        <div><p className="eyebrow">Gestion de casos</p><h2 id="form-title">{editingTicket ? "Editar ticket" : "Reportar incidente"}</h2></div>
        <span className="panel-icon" aria-hidden="true">+</span>
      </div>
      <form className="ticket-form" onSubmit={handleSubmit}>
        <label>Titulo del incidente<input name="titulo" value={formData.titulo} onChange={handleChange} minLength="3" maxLength="120" required placeholder="Ej. Intermitencia en la red" /></label>
        <label>Categoria<select name="categoria" value={formData.categoria} onChange={handleChange} required><option>Red</option><option>Hardware</option><option>Software</option></select></label>
        <label>Prioridad<select name="prioridad" value={formData.prioridad} onChange={handleChange} required><option>Alta</option><option>Media</option><option>Baja</option></select></label>
        <label>Estado<select name="estado" value={formData.estado} onChange={handleChange} required><option>Abierto</option><option>En Progreso</option><option>Cerrado</option></select></label>
        <label className="full-width">Descripcion<textarea name="descripcion" value={formData.descripcion} onChange={handleChange} minLength="10" maxLength="1000" rows="5" required placeholder="Describe el incidente, su alcance y las acciones realizadas." /></label>
        <div className="form-actions full-width">
          <button className="button button-primary" type="submit" disabled={submitting}>{submitting ? "Guardando..." : editingTicket ? "Guardar cambios" : "Crear ticket"}</button>
          {editingTicket && <button className="button button-secondary" type="button" onClick={onCancel}>Cancelar edicion</button>}
        </div>
      </form>
    </section>
  );
}
