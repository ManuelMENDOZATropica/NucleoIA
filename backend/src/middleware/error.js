export function notFoundHandler (req, res, next) {
  res.status(404).json({ message: `Ruta ${req.originalUrl} no encontrada` })
}

export function errorHandler (err, req, res, next) {
  console.error('❌ API Error:', err)
  const statusCode = err.status || 500
  res.status(statusCode).json({
    message: err.message || 'Error interno del servidor',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
}
