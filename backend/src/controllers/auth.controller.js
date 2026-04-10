import { registerSchema, loginSchema } from '../validators/auth.schema.js';
import { register, login } from '../services/auth.service.js';
import { ValidationError } from '../errors/AppError.js';

// Helper function to validate with Zod and throw ValidationError
function validateWithZod(schema, body) {
  const result = schema.safeParse(body);
  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    throw new ValidationError('Error de validación', errors);
  }
  return result.data;
}

/**
 * Controller para autenticación
 */
const authController = {
  /**
   * POST /nuevoUsuario - Registrar nuevo usuario
   */
  async nuevoUsuario(peticion, respuesta) {
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
  },

  /**
   * POST /login - Iniciar sesión
   */
  async login(peticion, respuesta) {
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
  },

  /**
   * GET /datosPrivados - Verificar autenticación
   */
  datosPrivados(peticion, respuesta) {
    respuesta.status(200).send({ resultado: 'SI', msg: 'Acceso Concedido', id: peticion.userId });
  },
};

export default authController;
