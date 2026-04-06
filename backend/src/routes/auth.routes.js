const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/nuevoUsuario', authController);
router.post('/login', authController);
router.get('/datosPrivados', authController);

module.exports = router;
