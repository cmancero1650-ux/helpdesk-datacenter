const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "No se pudo completar la solicitud");
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
