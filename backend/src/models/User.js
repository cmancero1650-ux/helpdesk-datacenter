export const ROLES = ["admin", "soporte"];

export function toPublicUser(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    email: row.email,
    rol: row.rol,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
