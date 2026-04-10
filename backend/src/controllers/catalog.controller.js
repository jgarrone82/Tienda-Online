import { ProductService, CartService } from '../services/catalog.service.js';
// Removed unused ValidationError import

// Helper function to validate with Zod and throw ValidationError
// Removed unused validateWithZod function

/**
 * Controller para catálogo y carrito
 */
const catalogController = {
  /**
   * GET /cargueProductos - Lista todos los productos
   */
  async cargueProductos(peticion, respuesta) {
    try {
      const productos = await ProductService.obtenerTodosProductos();
      respuesta.send(productos);
    } catch (error) {
      respuesta.status(error.statusCode || 500).send({
        resultado: 'ERROR',
        msg: 'Error interno del servidor',
      });
    }
  },

  /**
   * GET /inventarioInicial - Carga inicial de productos desde baseProductos.json
   */
  async inventarioInicial(peticion, respuesta) {
    try {
      const resultado = await ProductService.inicializarProductos();
      respuesta.send(resultado);
    } catch (error) {
      respuesta.status(error.statusCode || 500).send({
        resultado: 'ERROR',
        msg: 'Error interno del servidor',
      });
    }
  },

  /**
   * POST /actualizaInventario - Crear nuevo producto
   */
  async actualizaInventario(peticion, respuesta) {
    try {
      const resultado = await ProductService.actualizarInventario(peticion.body);
      respuesta.send(resultado);
    } catch (error) {
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
  },

  /**
   * GET /cantidadProductos - Cantidad de items en carrito
   */
  async cantidadProductos(peticion, respuesta) {
    try {
      const idUsuario = peticion.userId;
      const cantidad = await CartService.obtenerCantidadProductos(idUsuario);
      respuesta.status(200).send('' + cantidad);
    } catch (error) {
      respuesta
        .status(error.statusCode || 500)
        .send({ resultado: 'ERROR', msg: error.message || 'Error interno del servidor' });
    }
  },

  /**
   * POST /agregaCarrito - Agregar producto al carrito
   */
  async agregaCarrito(peticion, respuesta) {
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
        respuesta
          .status(error.statusCode || 500)
          .send({ resultado: 'ERROR', msg: error.message || 'Error interno del servidor' });
      }
    }
  },

  /**
   * GET /muestraCarrito - Mostrar contenido del carrito
   */
  async muestraCarrito(peticion, respuesta) {
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
  },

  /**
   * GET /pagar - Procesar pago (sin transacciones todavía)
   */
  async pagar(peticion, respuesta) {
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
  },
};

export default catalogController;
