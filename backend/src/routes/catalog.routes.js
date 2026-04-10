import express from 'express';
import catalogController from '../controllers/catalog.controller.js';
import { auth } from '../middlewares/auth.js';

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

export default router;
