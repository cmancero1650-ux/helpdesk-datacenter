const API_URL = "http://localhost:3000";
const state = {
  token: localStorage.getItem("helpdesk_token")
};

const loginPanel = document.querySelector("#loginPanel");
const appPanel = document.querySelector("#appPanel");
const logoutBtn = document.querySelector("#logoutBtn");
const toast = document.querySelector("#toast");
const ticketList = document.querySelector("#ticketList");
const loginForm = document.querySelector("#loginForm");
const ticketForm = document.querySelector("#ticketForm");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${state.token}`
  };
}

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);

  // Centraliza errores de la API para mostrarlos de forma uniforme en pantalla.
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "No se pudo completar la operacion");
  }

  return response.status === 204 ? null : response.json();
}

function setAuthenticated(token) {
  state.token = token;
  localStorage.setItem("helpdesk_token", token);
  loginPanel.hidden = true;
  appPanel.hidden = false;
  logoutBtn.hidden = false;
}

function setAnonymous() {
  state.token = null;
  localStorage.removeItem("helpdesk_token");
  loginPanel.hidden = false;
  appPanel.hidden = true;
  logoutBtn.hidden = true;
}

function priorityClass(priority) {
  return {
    Alta: "badge-high",
    Media: "badge-medium",
    Baja: "badge-low"
  }[priority] || "badge-low";
}

function renderTickets(tickets) {
  if (!tickets.length) {
    ticketList.innerHTML = "<p>No existen tickets registrados.</p>";
    return;
  }

  ticketList.innerHTML = tickets.map((ticket) => `
    <article class="ticket-card">
      <h3>${ticket.titulo}</h3>
      <p>${ticket.descripcion}</p>
      <div class="ticket-meta">
        <span class="badge">${ticket.categoria}</span>
        <span class="badge ${priorityClass(ticket.prioridad)}">${ticket.prioridad}</span>
        <span class="badge">${ticket.estado}</span>
      </div>
      <div class="ticket-actions">
        <button class="btn btn-secondary" type="button" data-action="edit" data-id="${ticket.id}">Editar</button>
        <button class="btn btn-danger" type="button" data-action="delete" data-id="${ticket.id}">Eliminar</button>
      </div>
    </article>
  `).join("");
}

async function loadTickets() {
  const tickets = await request("/tickets", {
    headers: authHeaders()
  });
  renderTickets(tickets);
}

function clearTicketForm() {
  ticketForm.reset();
  document.querySelector("#ticketId").value = "";
  document.querySelector("#estado").value = "Abierto";
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const data = await request("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
      })
    });

    setAuthenticated(data.token);
    await loadTickets();
    showToast("Sesion iniciada");
  } catch (error) {
    showToast(error.message);
  }
});

document.querySelector("#registerBtn").addEventListener("click", async () => {
  try {
    const data = await request("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: "Usuario Help Desk",
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
        rol: "soporte"
      })
    });

    setAuthenticated(data.token);
    await loadTickets();
    showToast("Usuario registrado");
  } catch (error) {
    showToast(error.message);
  }
});

ticketForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = document.querySelector("#ticketId").value;
  const payload = {
    titulo: document.querySelector("#titulo").value,
    descripcion: document.querySelector("#descripcion").value,
    categoria: document.querySelector("#categoria").value,
    prioridad: document.querySelector("#prioridad").value,
    estado: document.querySelector("#estado").value
  };

  try {
    await request(id ? `/tickets/${id}` : "/tickets", {
      method: id ? "PUT" : "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload)
    });

    clearTicketForm();
    await loadTickets();
    showToast(id ? "Ticket actualizado" : "Ticket creado");
  } catch (error) {
    showToast(error.message);
  }
});

ticketList.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = button.dataset.id;

  try {
    if (button.dataset.action === "delete") {
      await request(`/tickets/${id}`, {
        method: "DELETE",
        headers: authHeaders()
      });
      await loadTickets();
      showToast("Ticket eliminado");
      return;
    }

    const ticket = await request(`/tickets/${id}`, {
      headers: authHeaders()
    });

    document.querySelector("#ticketId").value = ticket.id;
    document.querySelector("#titulo").value = ticket.titulo;
    document.querySelector("#descripcion").value = ticket.descripcion;
    document.querySelector("#categoria").value = ticket.categoria;
    document.querySelector("#prioridad").value = ticket.prioridad;
    document.querySelector("#estado").value = ticket.estado;
    showToast("Ticket listo para editar");
  } catch (error) {
    showToast(error.message);
  }
});

document.querySelector("#refreshBtn").addEventListener("click", loadTickets);
document.querySelector("#clearFormBtn").addEventListener("click", clearTicketForm);
logoutBtn.addEventListener("click", setAnonymous);

if (state.token) {
  setAuthenticated(state.token);
  loadTickets().catch(() => setAnonymous());
}
