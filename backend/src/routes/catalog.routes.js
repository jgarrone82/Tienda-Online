const express = require('express');
const catalogController = require('../controllers/catalog.controller');
const { auth } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/cargueProductos', catalogController.cargueProductos);
router.get('/inventarioInicial', catalogController.inventarioInicial);
router.post('/actualizaInventario', catalogController.actualizaInventario);

// Protected routes (require auth)
router.get('/cantidadProductos', auth, catalogController.cantidadProductos);
router.post('/agregaCarrito', auth, catalogController.agregaCarrito);
router.get('/muestraCarrito', auth, catalogController.muestraCarrito);
router.get('/pagar', auth, catalogController.pagar);

module.exports = router;
