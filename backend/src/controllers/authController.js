import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

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
    const { nombre, email, password, rol } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "La contrasena debe tener al menos 6 caracteres" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ nombre, email, passwordHash, rol });
    const token = signToken(user);

    return res.status(201).json({ token, user });
  } catch (error) {
    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = signToken(user);
    return res.json({ token, user });
  } catch (error) {
    return next(error);
  }
}
