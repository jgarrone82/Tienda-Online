const express = require('express');
const { registerSchema, loginSchema } = require('../validators/auth.schema');
const { register, login } = require('../services/auth.service');
const { loginLimiter, registerLimiter } = require('../middlewares/rateLimiter');
const { ValidationError } = require('../errors/AppError');
const { auth } = require('../middlewares/auth');

const router = express.Router();

// Helper function to validate with Zod and throw ValidationError
function validateWithZod(schema, body) {
  const result = schema.safeParse(body);
  if (!result.success) {
    const errors = result.error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    throw new ValidationError('Error de validación', errors);
  }
  return result.data;
}

router.post('/nuevoUsuario', registerLimiter, async function (peticion, respuesta) {
  try {
    const validatedData = validateWithZod(registerSchema, peticion.body);
    const { nombre, correo, contrasena1 } = validatedData;

    const result = await register({ nombre, correo, contrasena1 });
    respuesta.status(200).send(result);
  } catch (error) {
    // Re-send the error with proper status code if it's an AppError
    if (error.statusCode) {
      respuesta.status(error.statusCode).send({
        resultado: 'NO',
        msg: error.message,
      });
    } else {
      respuesta.status(500).send({
        resultado: 'NO',
        msg: 'Error interno del servidor',
      });
    }
  }
});

router.post('/login', loginLimiter, async function (peticion, respuesta) {
  try {
    const validatedData = validateWithZod(loginSchema, peticion.body);
    const { email, pass } = validatedData;

    const result = await login({ email, pass });
    respuesta.status(200).send(result);
  } catch (error) {
    // Re-send the error with proper status code if it's an AppError
    if (error.statusCode) {
      respuesta.status(error.statusCode).send({
        resultado: error.statusCode === 401 ? 'Acceso Denegado' : 'NO',
        msg: error.message,
      });
    } else {
      respuesta.status(500).send({
        resultado: 'NO',
        msg: 'Error interno del servidor',
      });
    }
  }
});

router.get('/datosPrivados', auth, function (peticion, respuesta) {
  respuesta.status(200).send({ resultado: 'SI', msg: 'Acceso Concedido', id: peticion.userId });
});

module.exports = router;
