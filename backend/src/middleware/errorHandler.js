export function notFound(req, res) {
  res.status(404).json({ message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error, _req, res, _next) {
  const status = error.name === "ValidationError" ? 400 : 500;
  const details = error.name === "ValidationError"
    ? Object.values(error.errors).map((item) => item.message)
    : undefined;

  res.status(status).json({
    message: status === 400 ? "Datos invalidos" : "Error interno del servidor",
    details
  });
}
