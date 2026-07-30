import React from "react";

export default function Navigation({ user, onLogout }) {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ir al inicio">
        <span className="brand-mark" aria-hidden="true">HD</span>
        <span>
          <strong>Help Desk</strong>
          <small>Datacenter</small>
        </span>
      </a>
      <nav className="main-nav" aria-label="Navegacion principal">
        <a href="#inicio">Dashboard</a>
        <a href="#nuevo">Reportar incidente</a>
        <a href="#tickets">Tickets</a>
      </nav>
      <div className="user-menu">
        <span className="user-name">{user?.nombre || user?.email}</span>
        <button className="button button-quiet" type="button" onClick={onLogout}>Salir</button>
      </div>
    </header>
  );
}
