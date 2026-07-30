import React, { useEffect, useState } from "react";
import { authHeaders, request } from "./api.js";
import Dashboard from "./components/Dashboard.jsx";
import Navigation from "./components/Navigation.jsx";
import TicketForm from "./components/TicketForm.jsx";
import TicketList from "./components/TicketList.jsx";

const savedSession = JSON.parse(localStorage.getItem("helpdesk_session") || "null");

export default function App() {
  const [session, setSession] = useState(savedSession);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingTicket, setEditingTicket] = useState(null);
  const [notice, setNotice] = useState(null);
  const [login, setLogin] = useState({ email: "admin@helpdesk.local", password: "Admin123" });

  function showNotice(message, type = "success") { setNotice({ message, type }); window.setTimeout(() => setNotice(null), 3200); }

  async function loadTickets(token = session?.token) {
    if (!token) return;
    setLoading(true);
    try { setTickets(await request("/tickets", { headers: authHeaders(token, false) })); }
    catch (error) { showNotice(error.message, "error"); if (error.message.includes("Token")) logout(); }
    finally { setLoading(false); }
  }

  useEffect(() => { loadTickets(); }, [session?.token]);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const data = await request("/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(login) });
      const nextSession = { token: data.token, user: data.user };
      localStorage.setItem("helpdesk_session", JSON.stringify(nextSession));
      setSession(nextSession); showNotice("Sesion iniciada correctamente");
    } catch (error) { showNotice(error.message, "error"); }
  }

  function logout() { localStorage.removeItem("helpdesk_session"); setSession(null); setTickets([]); setEditingTicket(null); }

  async function handleTicketSubmit(payload, form) {
    setSubmitting(true);
    try {
      const path = editingTicket ? `/tickets/${editingTicket.id}` : "/tickets";
      const method = editingTicket ? "PUT" : "POST";
      await request(path, { method, headers: authHeaders(session.token), body: JSON.stringify(payload) });
      form.reset(); setEditingTicket(null); await loadTickets(); showNotice(editingTicket ? "Ticket actualizado" : "Ticket creado");
    } catch (error) { showNotice(error.message, "error"); }
    finally { setSubmitting(false); }
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseas eliminar este ticket?")) return;
    setDeletingId(id);
    try { await request(`/tickets/${id}`, { method: "DELETE", headers: authHeaders(session.token, false) }); await loadTickets(); showNotice("Ticket eliminado"); }
    catch (error) { showNotice(error.message, "error"); }
    finally { setDeletingId(null); }
  }

  if (!session) return <main className="login-page"><section className="login-card"><div className="login-brand"><span className="brand-mark">HD</span><p className="eyebrow">Help Desk Datacenter</p></div><h1>Gestion de incidentes</h1><p>Ingresa para consultar, crear y actualizar tickets del sistema.</p><form className="login-form" onSubmit={handleLogin}><label>Correo<input type="email" value={login.email} onChange={(event) => setLogin({ ...login, email: event.target.value })} required /></label><label>Contrasena<input type="password" value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} required /></label><button className="button button-primary button-wide" type="submit">Iniciar sesion</button></form><small className="login-hint">Usuario de prueba: admin@helpdesk.local / Admin123</small></section></main>;

  return <><Navigation user={session.user} onLogout={logout} /><main className="page-shell"><Dashboard tickets={tickets} onRefresh={loadTickets} loading={loading} /><div className="content-grid"><TicketForm editingTicket={editingTicket} onSubmit={handleTicketSubmit} onCancel={() => setEditingTicket(null)} submitting={submitting} /><TicketList tickets={tickets} onEdit={setEditingTicket} onDelete={handleDelete} deletingId={deletingId} /></div></main><footer className="site-footer">Help Desk Datacenter <span>|</span> Sistema de gestion de incidentes</footer>{notice && <div className={`notice notice-${notice.type}`} role="status">{notice.message}</div>}</>;
}
