# Guia de ejecucion local

## 1. Backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear el archivo `.env` a partir de `.env.example`.

Para trabajar sin MongoDB instalado, usar:

```env
USE_MEMORY_DB=true
JWT_SECRET=clave_segura_para_desarrollo
CORS_ORIGIN=http://localhost:8080
```

Ejecutar el servidor:

```bash
npm run dev
```

La API queda disponible en:

```text
http://localhost:3000
```

## 2. Datos de prueba

Si se usa una base MongoDB real, se pueden cargar datos iniciales con:

```bash
npm run seed
```

Usuario de prueba:

```text
admin@helpdesk.local
Admin123
```

## 3. Frontend

Servir la carpeta `frontend/` con cualquier servidor estatico. Ejemplo:

```bash
npx http-server frontend -p 8080
```

Abrir:

```text
http://localhost:8080
```

## 4. Flujo de prueba recomendado

1. Iniciar sesion.
2. Listar tickets existentes.
3. Crear un ticket nuevo.
4. Editar prioridad o estado.
5. Eliminar un ticket de prueba.
6. Verificar que no exista scroll horizontal en movil.
