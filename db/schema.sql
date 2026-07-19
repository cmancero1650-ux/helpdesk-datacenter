CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  rol VARCHAR(20) NOT NULL DEFAULT 'soporte',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT users_rol_check CHECK (rol IN ('admin', 'soporte'))
);

CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(120) NOT NULL,
  descripcion TEXT NOT NULL,
  categoria VARCHAR(20) NOT NULL,
  prioridad VARCHAR(10) NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'Abierto',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT tickets_categoria_check CHECK (categoria IN ('Red', 'Hardware', 'Software')),
  CONSTRAINT tickets_prioridad_check CHECK (prioridad IN ('Alta', 'Media', 'Baja')),
  CONSTRAINT tickets_estado_check CHECK (estado IN ('Abierto', 'En Progreso', 'Cerrado'))
);

CREATE INDEX IF NOT EXISTS idx_tickets_estado ON tickets (estado);
CREATE INDEX IF NOT EXISTS idx_tickets_prioridad ON tickets (prioridad);
