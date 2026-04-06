const jwt = require('jsonwebtoken');

/**
 * Unified JWT authentication middleware.
 * Replaces both autorizacion.js and validaToken.js.
 *
 * Contract:
 * - Reads token from `Authorization: Bearer <token>` header
 * - Sets `req.userId` with the decoded _id
 * - Does NOT mutate req.body
 * - Returns 401 on invalid/expired token, 403 on missing token
 */
function auth(peticion, respuesta, next) {
  const bearerHeader = peticion.headers['autorizacion'];

  if (!bearerHeader) {
    return respuesta.status(403).send({ resultado: 'Acceso Denegado' });
  }

  const bearer = bearerHeader.split(' ');
  const token = bearer[1];

  if (!token || token === 'null') {
    return respuesta.status(403).send({ resultado: 'Acceso Denegado' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    peticion.userId = payload._id;
    next();
  } catch (error) {
    return respuesta
      .status(401)
      .send({ resultado: 'Acceso Denegado', msg: 'Token inválido o expirado' });
  }
}

module.exports = { auth };
