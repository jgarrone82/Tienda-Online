const express = require('express');
const { ProductService, CartService } = require('../services/catalog.service');
const { productoSchema } = require('../validators/catalog.schema');
const { auth } = require('../middlewares/auth');
const { ValidationError } = require('../errors/AppError');

const router = express.Router();

// Helper function to validate with Zod and throw ValidationError
function validateWithZod(schema, body) {
  const result = schema.safeParse(body);
  if (!result.success) {
    const errors = result.error.errors.map(err => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    throw new ValidationError('Error de validación', errors);
  }
  return result.data;
}

// GET /cargueProductos - Lista todos los productos
router.get('/cargueProductos', async function (peticion, respuesta) {
  try {
    const productos = await ProductService.obtenerTodosProductos();
    respuesta.send(productos);
  } catch (error) {
    respuesta.status(500).send({ 
      resultado: 'ERROR', 
      msg: 'Error interno del servidor' 
    });
  }
});
    
    // Pasamos todos los campos incluyendo cantidadComprada si existía
    const resultado = await ProductService.actualizarInventario({
      nombreProducto: validatedData.nombreProducto,
      imagenUrl: validatedData.imagenUrl,
      cantidadDisponible: validatedData.cantidadDisponible,
      precioUnitario: validatedData.precioUnitario,
      cantidadComprada: peticion.body.cantidadComprada // Mantener para compatibilidad
    });
    
    respuesta.send(resultado);
  } catch (error) {
    if (error.statusCode) {
      respuesta.status(error.statusCode).send({ 
        resultado: 'ERROR', 
        msg: error.message 
      });
    } else {
      respuesta.status(500).send({
        resultado: 'ERROR',
        msg: 'Error interno del servidor',
      });
    }
  }
});
    }
  }
});
    if (error.statusCode) {
      respuesta.status(error.statusCode).send({
        resultado: 'ERROR',
        msg: error.message,
      });
    } else {
      
      respuesta.status(500).send({
        resultado: 'ERROR',
        msg: 'Error interno del servidor',
      });
    }
  }
});

// GET /cantidadProductos - Cantidad de items en carrito
router.get('/cantidadProductos', auth, async function (peticion, respuesta) {
  try {
    const idUsuario = peticion.userId;
    const cantidad = await CartService.obtenerCantidadProductos(idUsuario);
    respuesta.status(200).send('' + cantidad);
  } catch (error) {
    
    respuesta.status(500).send('Error interno');
  }
});

// POST /agregaCarrito - Agregar producto al carrito
router.post('/agregaCarrito', auth, async function (peticion, respuesta) {
  try {
    const idUsuario = peticion.userId;
    const { idProducto, cantidadCarrito } = peticion.body;

    await CartService.agregarAlCarrito(idUsuario, { idProducto, cantidadCarrito });

    respuesta.status(201).send({ resultado: true });
  } catch (error) {
    if (error.statusCode) {
      respuesta.status(error.statusCode).send({
        resultado: false,
        msg: error.message,
      });
    } else {
      
      respuesta.status(500).send('Hubo un error agregando producto al carrito');
    }
  }
});

// GET /muestraCarrito - Mostrar contenido del carrito
router.get('/muestraCarrito', auth, async function (peticion, respuesta) {
  try {
    const idUsuario = peticion.userId;
    const carrito = await CartService.obtenerCarrito(idUsuario);

    if (carrito !== null) {
      respuesta.status(200).send(carrito);
    } else {
      respuesta.status(204).send(null);
    }
  } catch (error) {
    
    respuesta.status(500).send('Error interno del servidor');
  }
});

// GET /pagar - Procesar pago (sin transacciones todavía)
router.get('/pagar', auth, async function (peticion, respuesta) {
  try {
    const idUsuario = peticion.userId;
    const resultado = await CartService.procesarPago(idUsuario);
    respuesta.send(resultado);
  } catch (error) {
    if (error.message === 'NO HAY PRODUCTOS PARA PAGAR') {
      return respuesta.send({ msg: 'NO HAY PRODUCTOS PARA PAGAR' });
    }

    if (error.statusCode) {
      respuesta.status(error.statusCode).send({
        resultado: 'ERROR',
        msg: error.message,
      });
    } else {
      
      respuesta.status(500).send({
        resultado: 'ERROR',
        msg: 'Error interno del servidor',
      });
    }
  }
});

module.exports = router;
