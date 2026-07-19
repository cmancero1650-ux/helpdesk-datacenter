# API REST Help Desk Datacenter

Base URL local:

```text
http://localhost:3000
```

## Autenticacion

La API usa JSON Web Tokens. Primero se debe iniciar sesion y luego enviar el token
en la cabecera `Authorization`.

```http
Authorization: Bearer TOKEN
```

### Registrar usuario

```http
POST /auth/register
Content-Type: application/json
```

```json
{
  "nombre": "Usuario Help Desk",
  "email": "usuario@helpdesk.local",
  "password": "Admin123",
  "rol": "soporte"
}
```

### Iniciar sesion

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "email": "admin@helpdesk.local",
  "password": "Admin123"
}
```

## Tickets

Los endpoints de tickets requieren autenticacion.

### Listar tickets

```http
GET /tickets
```

### Buscar ticket por id

```http
GET /tickets/{id}
```

### Crear ticket

```http
POST /tickets
Content-Type: application/json
```

```json
{
  "titulo": "Servidor sin conexion",
  "descripcion": "El servidor principal no responde desde la red interna.",
  "categoria": "Red",
  "prioridad": "Alta",
  "estado": "Abierto"
}
```

### Actualizar ticket

```http
PUT /tickets/{id}
Content-Type: application/json
```

```json
{
  "estado": "En Progreso",
  "prioridad": "Media"
}
```

### Eliminar ticket

```http
DELETE /tickets/{id}
```

Respuesta exitosa: `204 No Content`.
