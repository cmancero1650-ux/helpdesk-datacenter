import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { Ticket } from "./models/Ticket.js";
import { User } from "./models/User.js";

dotenv.config();

await connectDatabase();

await Ticket.deleteMany();
await User.deleteMany();

await User.create({
  nombre: "Administrador Help Desk",
  email: "admin@helpdesk.local",
  passwordHash: await bcrypt.hash("Admin123", 10),
  rol: "admin"
});

await Ticket.insertMany([
  {
    titulo: "Intermitencia en la red interna",
    descripcion: "Los usuarios reportan cortes de conectividad en el segundo piso.",
    categoria: "Red",
    prioridad: "Alta",
    estado: "Abierto"
  },
  {
    titulo: "Equipo de monitoreo no enciende",
    descripcion: "La estacion de monitoreo principal no responde al boton de encendido.",
    categoria: "Hardware",
    prioridad: "Media",
    estado: "En Progreso"
  },
  {
    titulo: "Error al iniciar aplicacion de soporte",
    descripcion: "La aplicacion muestra un mensaje de error al iniciar sesion.",
    categoria: "Software",
    prioridad: "Baja",
    estado: "Cerrado"
  }
]);

console.log("Datos iniciales cargados. Usuario: admin@helpdesk.local / Admin123");
await disconnectDatabase();
