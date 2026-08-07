# Despliegue de la Actividad 9

La aplicacion esta desplegada separando los tres servicios en produccion:

- PostgreSQL administrado en Neon, Supabase, Render PostgreSQL o Railway.
- Backend Node.js/Express publicado en Render, Railway o un VPS.
- `frontend-spa/dist` publicado en Vercel, Netlify o GitHub Pages.

## URLs publicas verificadas

- Base de datos Neon: `https://console.neon.tech/app/projects/aged-star-58712964`
- Backend Render: `https://helpdesk-datacenter-7sv8.onrender.com`
- Frontend Vercel: `https://helpdesk-frontend-ashy-rho.vercel.app`

El backend se publico desde la rama `feature/frontend-spa` con el servicio
gratuito de Render. La base remota contiene el esquema, un usuario
administrador y tres tickets iniciales.

## Backend

En el servicio Node.js configurar:

```env
PORT=3000
PGHOST=servidor-postgresql
PGPORT=5432
PGDATABASE=helpdesk_datacenter
PGUSER=usuario
PGPASSWORD=clave-segura
JWT_SECRET=clave-larga-y-segura
JWT_EXPIRES_IN=2h
CORS_ORIGIN=https://helpdesk-frontend-ashy-rho.vercel.app
```

Ejecutar el esquema de `db/schema.sql` en la base remota y luego `npm run seed` una sola vez. El servicio debe arrancar con `npm start` y comprobarse con `GET /health`.

## Frontend

En el hosting estatico configurar:

```env
VITE_API_URL=https://helpdesk-datacenter-7sv8.onrender.com
```

El comando de construccion es `npm run build` dentro de `frontend-spa/`. Se publica la carpeta `frontend-spa/dist`.

## Verificacion final

1. Abrir `https://helpdesk-frontend-ashy-rho.vercel.app`.
2. Iniciar sesion con un usuario creado en la base remota.
3. Verificar listar, crear, editar y eliminar tickets.
4. Confirmar que el navegador no solicite ninguna URL `localhost`.

La prueba publica realizada confirmo login, consulta de tres tickets y
creacion/eliminacion de un registro temporal desde el frontend Vercel.
