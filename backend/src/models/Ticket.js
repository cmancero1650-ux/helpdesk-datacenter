export const CATEGORIAS = ["Red", "Hardware", "Software"];
export const PRIORIDADES = ["Alta", "Media", "Baja"];
export const ESTADOS = ["Abierto", "En Progreso", "Cerrado"];

export function validateTicketPayload(payload, { partial = false } = {}) {
  const errors = [];

  if (!partial || payload.titulo !== undefined) {
    if (typeof payload.titulo !== "string" || payload.titulo.trim().length < 3) {
      errors.push("El titulo debe tener al menos 3 caracteres");
    }
  }

  if (!partial || payload.descripcion !== undefined) {
    if (typeof payload.descripcion !== "string" || payload.descripcion.trim().length < 10) {
      errors.push("La descripcion debe tener al menos 10 caracteres");
    }
  }

  if (!partial || payload.categoria !== undefined) {
    if (!CATEGORIAS.includes(payload.categoria)) {
      errors.push("La categoria debe ser Red, Hardware o Software");
    }
  }

  if (!partial || payload.prioridad !== undefined) {
    if (!PRIORIDADES.includes(payload.prioridad)) {
      errors.push("La prioridad debe ser Alta, Media o Baja");
    }
  }

  if (payload.estado !== undefined && !ESTADOS.includes(payload.estado)) {
    errors.push("El estado debe ser Abierto, En Progreso o Cerrado");
  }

  return errors;
}
