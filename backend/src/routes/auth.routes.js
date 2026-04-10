import express from 'express';
import authController from '../controllers/auth.controller.js';
import { loginLimiter, registerLimiter } from '../middlewares/rateLimiter.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/nuevoUsuario', registerLimiter, authController.nuevoUsuario);
router.post('/login', loginLimiter, authController.login);
router.get('/datosPrivados', auth, authController.datosPrivados);

export default router;
