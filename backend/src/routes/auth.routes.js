const express = require('express');
const authController = require('../controllers/auth.controller');
const { loginLimiter, registerLimiter } = require('../middlewares/rateLimiter');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.post('/nuevoUsuario', registerLimiter, authController.nuevoUsuario);
router.post('/login', loginLimiter, authController.login);
router.get('/datosPrivados', auth, authController.datosPrivados);

module.exports = router;
