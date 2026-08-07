import React, { useEffect, useRef, useState } from "react";
import { authHeaders, request } from "./api.js";
import Dashboard from "./components/Dashboard.jsx";
import Navigation from "./components/Navigation.jsx";
import TicketForm from "./components/TicketForm.jsx";
import TicketList from "./components/TicketList.jsx";

function readSavedSession() {
  try {
    return JSON.parse(localStorage.getItem("helpdesk_session") || "null");
  } catch (_error) {
    localStorage.removeItem("helpdesk_session");
    return null;
  }
}

const savedSession = readSavedSession();

export default function App() {
  const [session, setSession] = useState(savedSession);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingTicket, setEditingTicket] = useState(null);
  const [notice, setNotice] = useState(null);
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  const [login, setLogin] = useState({ email: "admin@helpdesk.local", password: "Admin123" });
  const noticeTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(noticeTimer.current), []);

  function showNotice(message, type = "success") {
    window.clearTimeout(noticeTimer.current);
    setNotice({ message, type });
    noticeTimer.current = window.setTimeout(() => setNotice(null), 3200);
  }

  async function loadTickets(token = session?.token) {
    if (!token) return;
    setLoading(true);
    try {
      const data = await request("/tickets", { headers: authHeaders(token, false) });
      setTickets(Array.isArray(data) ? data : []);
    } catch (error) {
      showNotice(error.message, "error");
      if (error.status === 401) logout();
    }
    finally { setLoading(false); }
  }

  useEffect(() => { loadTickets(); }, [session?.token]);

  async function handleLogin(event) {
    event.preventDefault();
    setLoginSubmitting(true);
    try {
      const data = await request("/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(login) });
      const nextSession = { token: data.token, user: data.user };
      localStorage.setItem("helpdesk_session", JSON.stringify(nextSession));
      setSession(nextSession); showNotice("Sesion iniciada correctamente");
    } catch (error) { showNotice(error.message, "error"); }
    finally { setLoginSubmitting(false); }
  }

  function logout() { localStorage.removeItem("helpdesk_session"); setSession(null); setTickets([]); setEditingTicket(null); }

  async function handleTicketSubmit(payload) {
    const isEditing = Boolean(editingTicket);
    setSubmitting(true);
    try {
      const path = isEditing ? `/tickets/${editingTicket.id}` : "/tickets";
      const method = isEditing ? "PUT" : "POST";
      await request(path, { method, headers: authHeaders(session.token), body: JSON.stringify(payload) });
      setEditingTicket(null); await loadTickets(); showNotice(isEditing ? "Ticket actualizado" : "Ticket creado");
    } catch (error) {
      showNotice(error.message, "error");
      if (error.status === 401) logout();
    }
    finally { setSubmitting(false); }
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseas eliminar este ticket?")) return;
    setDeletingId(id);
    try { await request(`/tickets/${id}`, { method: "DELETE", headers: authHeaders(session.token, false) }); await loadTickets(); showNotice("Ticket eliminado"); }
    catch (error) {
      showNotice(error.message, "error");
      if (error.status === 401) logout();
    }
    finally { setDeletingId(null); }
  }

  const noticeView = notice && <div className={`notice notice-${notice.type}`} role="status" aria-live="polite">{notice.message}</div>;

  if (!session) return <>{<main className="login-page"><section className="login-card"><div className="login-brand"><span className="brand-mark">HD</span><p className="eyebrow">Help Desk Datacenter</p></div><h1>Gestion de incidentes</h1><p>Ingresa para consultar, crear y actualizar tickets del sistema.</p><form className="login-form" onSubmit={handleLogin}><label>Correo<input type="email" value={login.email} onChange={(event) => setLogin({ ...login, email: event.target.value })} required /></label><label>Contrasena<input type="password" value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} required /></label><button className="button button-primary button-wide" type="submit" disabled={loginSubmitting}>{loginSubmitting ? "Validando..." : "Iniciar sesion"}</button></form><small className="login-hint">Usuario de prueba: admin@helpdesk.local / Admin123</small></section></main>}{noticeView}</>;

  return <><Navigation user={session.user} onLogout={logout} /><main className="page-shell"><Dashboard tickets={tickets} onRefresh={loadTickets} loading={loading} /><div className="content-grid"><TicketForm editingTicket={editingTicket} onSubmit={handleTicketSubmit} onCancel={() => setEditingTicket(null)} submitting={submitting} /><TicketList tickets={tickets} onEdit={setEditingTicket} onDelete={handleDelete} deletingId={deletingId} loading={loading} /></div></main><footer className="site-footer">Help Desk Datacenter <span>|</span> Sistema de gestion de incidentes</footer>{noticeView}</>;
}
