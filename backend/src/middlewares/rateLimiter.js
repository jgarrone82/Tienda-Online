const rateLimit = require('express-rate-limit');
const env = require('../config/env');

/**
 * Rate limiter for login endpoint.
 * Limits to env.RATE_LIMIT_LOGIN requests per 15-minute window.
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: env.RATE_LIMIT_LOGIN,
  message: {
    resultado: 'Acceso Denegado',
    msg: 'Demasiados intentos de login. Intente más tarde.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter for register endpoint.
 * Limits to env.RATE_LIMIT_REGISTER requests per 15-minute window.
 */
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: env.RATE_LIMIT_REGISTER,
  message: {
    resultado: 'Acceso Denegado',
    msg: 'Demasiados intentos de registro. Intente más tarde.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { loginLimiter, registerLimiter };
