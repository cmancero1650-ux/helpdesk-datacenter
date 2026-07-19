import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  // Todos los endpoints de tickets exigen token Bearer para proteger el CRUD.
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token de autenticacion requerido" });
  }

  try {
    const token = header.replace("Bearer ", "");
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (_error) {
    return res.status(401).json({ message: "Token invalido o expirado" });
  }
}
