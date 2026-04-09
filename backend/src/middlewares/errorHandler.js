/* eslint-disable no-unused-vars */
/**
 * Centralized error handling middleware.
 * Must be registered AFTER all routes in the Express app.
 *
 * Handles:
 * - Operational errors (AppError instances)
 * - Unhandled promise rejections
 * - Unexpected errors
 */
function errorHandler(error, peticion, respuesta, next) {
  // Log error for debugging (remove in production or use a logger)
  // Removed console.error

  // If it's an operational error with a status code, use it
  if (error.statusCode) {
    return respuesta.status(error.statusCode).send({
      resultado: 'NO',
      msg: error.message,
    });
  }

  // If it's a MongoDB validation error
  if (error.name === 'ValidationError') {
    return respuesta.status(400).send({
      resultado: 'NO',
      msg: 'Datos inválidos',
      detalles: error.message,
    });
  }

  // If it's a MongoDB cast error (invalid ObjectId)
  if (error.name === 'CastError') {
    return respuesta.status(400).send({
      resultado: 'NO',
      msg: 'ID de recurso inválido',
    });
  }

  // Default: 500 internal server error
  return respuesta.status(500).send({
    resultado: 'NO',
    msg: 'Error interno del servidor',
  });
}

module.exports = { errorHandler };
