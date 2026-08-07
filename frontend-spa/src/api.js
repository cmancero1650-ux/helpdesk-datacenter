const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export class ApiError extends Error {
  constructor(message, status = 0, details = undefined) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_URL}${path}`, options);
  } catch (_error) {
    throw new ApiError("No se pudo conectar con el servidor. Verifica que la API este disponible.");
  }

  const data = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      data?.message || "No se pudo completar la solicitud",
      response.status,
      data?.details
    );
  }

  return data;
}

export function authHeaders(token, json = true) {
  return {
    ...(json ? { "Content-Type": "application/json" } : {}),
    Authorization: `Bearer ${token}`
  };
}

export { API_URL };
