# Help Desk Datacenter

Prototipo web academico para la gestion de incidentes de un centro de datos.

Repositorio: https://github.com/cmancero1650-ux/helpdesk-datacenter

## Paginas principales

- `index.html`: demostracion del Design System.
- `style.css`: estilos reutilizables del UI Kit.
- `dashboard.html`: dashboard del sistema.
- `reportar.html`: formulario para registrar incidentes.
- `tickets.html`: listado de tickets.
- `frontend/`: interfaz moderna y responsive conectada a la API REST.
- `frontend-spa/`: Single Page Application React de la Actividad 9.
- `backend/`: API RESTful con Node.js, Express, PostgreSQL y autenticacion JWT.
- `db/`: esquema SQL y datos iniciales de tickets.
- `docs/`: documentacion tecnica de endpoints y ejecucion local.

## Design System

La demostracion de componentes se encuentra en `index.html` y utiliza
la hoja de estilos `style.css`.

Componentes disponibles:

- Botones: `.btn`, `.btn--primary`, `.btn--secondary` y `.btn--danger`.
- Formularios: `.form-group` y `.form-control`.
- Tarjetas: `.ticket-card` y sus elementos internos.
- Prioridades: `.badge--high`, `.badge--medium` y `.badge--low`.
- Alertas: `.alert--success`, `.alert--warning` y `.alert--danger`.

Para reutilizar los componentes, enlace la hoja CSS en el documento HTML:

```html
<link rel="stylesheet" href="style.css">
```

Ejemplo de boton primario:

```html
<button class="btn btn--primary" type="button">Guardar ticket</button>
```

## Responsive Web Design

Las paginas `dashboard.html`, `reportar.html` y `tickets.html` integran el
UI Kit mediante `style.css` y usan Flexbox, CSS Grid y media queries.

Puntos aplicados:

- Navegacion flexible con adaptacion vertical en pantallas menores a `768px`.
- Dashboard organizado con CSS Grid.
- Formulario responsive con campos al `100%` en movil.
- Tabla de tickets convertida en tarjetas para evitar scroll horizontal.
- Etiqueta `<meta name="viewport">` incluida en todas las paginas.

Validaciones recomendadas para el informe:

- W3C Markup Validation Service para los archivos HTML.
- W3C CSS Validation Service para `style.css`.
- Capturas en escritorio, tablet y movil usando DevTools del navegador.

## Backend API REST

La API implementa autenticacion de usuarios y CRUD completo de tickets.

Stack utilizado:

- Node.js
- Express
- PostgreSQL 18
- Driver `pg`
- JWT para autenticacion
- bcryptjs para contrasenas
- Helmet y CORS para seguridad basica

Endpoints principales:

- `POST /auth/register`: registrar usuario.
- `POST /auth/login`: iniciar sesion.
- `GET /tickets`: listar tickets.
- `GET /tickets/:id`: buscar ticket por id.
- `POST /tickets`: crear ticket.
- `PUT /tickets/:id`: actualizar ticket.
- `DELETE /tickets/:id`: eliminar ticket.

## Ejecucion local

Backend:

```bash
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```

Configuracion esperada en `backend/.env`:

```env
PGHOST=localhost
PGPORT=5432
PGDATABASE=helpdesk_datacenter
PGUSER=postgres
PGPASSWORD=2026
JWT_SECRET=clave_segura_para_desarrollo
CORS_ORIGIN=http://localhost:5173,http://localhost:8080
```

Antes de ejecutar `npm run seed`, cree la base de datos PostgreSQL:

```bash
createdb -U postgres helpdesk_datacenter
```

Frontend:

```bash
npx http-server frontend -p 8080
```

Abrir en el navegador:

```text
http://localhost:8080
```

## Frontend SPA - Actividad 9

La SPA React se encuentra en `frontend-spa/` y contiene los componentes
`Navigation`, `Dashboard`, `TicketForm` y `TicketList`. Consume la API REST,
permite autenticarse y realizar el CRUD de tickets.

```bash
cd frontend-spa
npm install
copy .env.example .env
npm run dev
```

La aplicación se abre en `http://localhost:5173`. Para generar la versión de
producción use `npm run build`; la carpeta resultante es `dist/`.

La guía de publicación en PostgreSQL remoto, Render/Railway y Vercel/Netlify
está en `docs/DEPLOYMENT.md`.

Usuario de prueba despues de ejecutar `npm run seed`:

```text
admin@helpdesk.local
Admin123
```

La documentacion ampliada se encuentra en:

- `docs/API.md`
- `docs/INSTRUCCIONES.md`

## Capturas

Dashboard responsive:

![Dashboard escritorio](Capturas/01-dashboard-escritorio.png)

Formulario de tickets:

![Formulario escritorio](Capturas/02-reportar-escritorio.png)

Listado de tickets:

![Tickets escritorio](Capturas/03-tickets-escritorio.png)
