import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../config/database.js";
import { ROLES, toPublicUser } from "../models/User.js";

function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      rol: user.rol
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "2h"
    }
  );
}

export async function register(req, res, next) {
  try {
    const { nombre, email, password, rol = "soporte" } = req.body;

    if (!nombre || nombre.trim().length < 3) {
      return res.status(400).json({ message: "El nombre debe tener al menos 3 caracteres" });
    }

    if (!email) {
      return res.status(400).json({ message: "El correo es obligatorio" });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "La contrasena debe tener al menos 6 caracteres" });
    }

    if (!ROLES.includes(rol)) {
      return res.status(400).json({ message: "Rol no permitido" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await query(
      `INSERT INTO users (nombre, email, password_hash, rol)
       VALUES ($1, LOWER($2), $3, $4)
       RETURNING id, nombre, email, rol, created_at, updated_at`,
      [nombre.trim(), email.trim(), passwordHash, rol]
    );

    const user = toPublicUser(result.rows[0]);
    const token = signToken(user);

    return res.status(201).json({ token, user });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await query(
      "SELECT id, nombre, email, password_hash, rol, created_at, updated_at FROM users WHERE email = LOWER($1)",
      [email]
    );

    const userRow = result.rows[0];
    if (!userRow) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const validPassword = await bcrypt.compare(password, userRow.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const user = toPublicUser(userRow);
    const token = signToken(user);
    return res.json({ token, user });
  } catch (error) {
    return next(error);
  }
}
