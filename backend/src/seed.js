import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { connectDatabase, disconnectDatabase, initializeDatabase, query } from "./config/database.js";

dotenv.config();

await connectDatabase();
await initializeDatabase();

await query("TRUNCATE TABLE tickets, users RESTART IDENTITY CASCADE");

const passwordHash = await bcrypt.hash("Admin123", 10);

await query(
  `INSERT INTO users (nombre, email, password_hash, rol)
   VALUES ($1, $2, $3, $4)`,
  ["Administrador Help Desk", "admin@helpdesk.local", passwordHash, "admin"]
);

await query(
  `INSERT INTO tickets (titulo, descripcion, categoria, prioridad, estado)
   VALUES
   ($1, $2, $3, $4, $5),
   ($6, $7, $8, $9, $10),
   ($11, $12, $13, $14, $15)`,
  [
    "Intermitencia en la red interna",
    "Los usuarios reportan cortes de conectividad en el segundo piso.",
    "Red",
    "Alta",
    "Abierto",
    "Equipo de monitoreo no enciende",
    "La estacion de monitoreo principal no responde al boton de encendido.",
    "Hardware",
    "Media",
    "En Progreso",
    "Error al iniciar aplicacion de soporte",
    "La aplicacion muestra un mensaje de error al iniciar sesion.",
    "Software",
    "Baja",
    "Cerrado"
  ]
);

console.log("Datos iniciales cargados. Usuario: admin@helpdesk.local / Admin123");
await disconnectDatabase();
