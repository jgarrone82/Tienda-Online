const express = require('express');
const catalogController = require('../controllers/catalog.controller');

const router = express.Router();

router.get('/cargueProductos', catalogController);
router.post('/actualizaInventario', catalogController);
router.get('/cantidadProductos', catalogController);
router.post('/agregaCarrito', catalogController);
router.get('/muestraCarrito', catalogController);
router.get('/pagar', catalogController);

module.exports = router;
