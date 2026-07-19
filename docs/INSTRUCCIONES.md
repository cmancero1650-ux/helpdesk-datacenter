# Guia de ejecucion local con PostgreSQL

## 1. Requisitos

- Node.js 20 o superior.
- PostgreSQL instalado y en ejecucion.
- Usuario local de PostgreSQL: `postgres`.
- Contrasena local indicada para la actividad: `2026`.

## 2. Crear la base de datos

Si `psql.exe` no esta en el PATH, en Windows puede usar la ruta:

```powershell
$env:PGPASSWORD = "2026"
& "C:\Program Files\PostgreSQL\18\bin\createdb.exe" -U postgres helpdesk_datacenter
```

Si ya existe la base, no es necesario crearla nuevamente.

## 3. Configurar backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear el archivo `.env` desde `.env.example`:

```bash
copy .env.example .env
```

Contenido recomendado:

```env
PORT=3000
PGHOST=localhost
PGPORT=5432
PGDATABASE=helpdesk_datacenter
PGUSER=postgres
PGPASSWORD=2026
JWT_SECRET=clave_segura_para_desarrollo
JWT_EXPIRES_IN=2h
CORS_ORIGIN=http://localhost:8080
```

## 4. Crear tablas y datos iniciales

El backend crea las tablas automaticamente al arrancar. Para cargar usuario y tickets de prueba:

```bash
npm run seed
```

Usuario de prueba:

```text
admin@helpdesk.local
Admin123
```

## 5. Ejecutar API

```bash
npm run dev
```

La API queda disponible en:

```text
http://localhost:3000
```

Prueba rapida:

```text
GET http://localhost:3000/health
```

## 6. Ejecutar frontend

Servir la carpeta `frontend/` con cualquier servidor estatico. Ejemplo:

```bash
npx http-server frontend -p 8080
```

Abrir:

```text
http://localhost:8080
```

## 7. Flujo de prueba recomendado

1. Iniciar sesion.
2. Listar tickets existentes.
3. Crear un ticket nuevo.
4. Editar prioridad o estado.
5. Eliminar un ticket de prueba.
6. Verificar que no exista scroll horizontal en movil.
