# Help Desk Datacenter

Prototipo web academico para la gestion de incidentes de un centro de datos.

## Paginas principales

- `index.html`: demostracion del Design System.
- `style.css`: estilos reutilizables del UI Kit.
- `dashboard.html`: dashboard del sistema.
- `reportar.html`: formulario para registrar incidentes.
- `tickets.html`: listado de tickets.

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
