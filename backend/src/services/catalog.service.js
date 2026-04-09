const mongoose = require('mongoose');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { ValidationError, AppError } = require('../errors/AppError');
const { productoSchema, agregaCarritoSchema } = require('../validators/catalog.schema');

// Helper function to validate with Zod and throw ValidationError
function validateWithZod(schema, body) {
  const result = schema.safeParse(body);
  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    throw new ValidationError('Error de validación', errors);
  }
  return result.data;
}

/**
 * Servicio para operaciones de productos (catálogo)
 */
class ProductService {
  /**
   * Inicializa la base de datos con productos desde baseProductos.json
   * @returns {Promise<Object>} Respuesta de éxito
   */
  static async inicializarProductos() {
    const productos = await Product.find();

    if (productos.length !== 0) {
      return { resultado: 'OK', msg: 'baseProductos.json ya existia' };
    }

    const baseProductos = require('../../baseProductos.json');
    for (let i = 0; i < baseProductos.length; i++) {
      const insertaProductos = new Product(baseProductos[i]);
      await insertaProductos.save();
    }

    return { resultado: 'OK', msg: 'Se cargaron los productos correctamente' };
  }

  /**
   * Obtiene todos los productos disponibles
   * @returns {Promise<Array>} Lista de productos con formato de respuesta original
   */
  static async obtenerTodosProductos() {
    const productos = await Product.find();
    return productos.map((producto) => ({
      idProducto: producto._id,
      nombreProducto: producto.nombreProducto,
      imagenUrl: producto.imagenUrl,
      cantidadDisponible: producto.cantidadDisponible,
      precioUnitario: producto.precioUnitario,
    }));
  }

  /**
   * Actualiza el inventario de un producto (crea uno nuevo si no existe)
   * @param {Object} datos - Datos del producto a crear/actualizar
   * @returns {Promise<Object>} Respuesta de éxito
   */
  static async actualizarInventario(datos) {
    // Validar datos de entrada
    const validatedData = validateWithZod(productoSchema, {
      nombreProducto: datos.nombreProducto,
      imagenUrl: datos.imagenUrl,
      cantidadDisponible: datos.cantidadDisponible,
      precioUnitario: datos.precioUnitario,
    });

    // Note: cantidadComprada se ignora para compatibilidad hacia atrás
    // En el endpoint original, se guardaba pero no se usaba

    const producto = new Product(validatedData);
    await producto.save();

    return { resultado: 'OK', msg: 'Se cargaron los productos correctamente' };
  }
}

/**
 * Servicio para operaciones del carrito de compras
 */
class CartService {
  /**
   * Obtiene la cantidad de productos distintos en el carrito
   * @param {string} idUsuario - ID del usuario
   * @returns {Promise<number>} Cantidad de productos en el carrito
   */
  static async obtenerCantidadProductos(idUsuario) {
    const consulta = await Cart.findOne({ idUsuario });
    if (!consulta) return 0;
    return consulta.productos.length;
  }

  /**
   * Obtiene el contenido completo del carrito con detalles de productos
   * @param {string} idUsuario - ID del usuario
   * @returns {Promise<Array>} Lista de items del carrito con subtotales
   */
  static async obtenerCarrito(idUsuario) {
    const consulta = await Cart.findOne({ idUsuario })
      .populate('productos.idProducto', ['_id', 'nombreProducto', 'imagenUrl', 'precioUnitario'])
      .exec();

    if (!consulta) return null;

    return consulta.productos.map((elemento) => ({
      idProducto: elemento.idProducto._id,
      nombreProducto: elemento.idProducto.nombreProducto,
      imagenUrl: elemento.idProducto.imagenUrl,
      precioUnitario: elemento.idProducto.precioUnitario,
      cantidadCarrito: elemento.cantidadCarrito,
      subtotal: elemento.idProducto.precioUnitario * elemento.cantidadCarrito,
    }));
  }

  /**
   * Agrega un producto al carrito o actualiza su cantidad
   * @param {string} idUsuario - ID del usuario
   * @param {Object} datos - { idProducto, cantidadCarrito }
   * @returns {Promise<void>}
   */
  static async agregarAlCarrito(idUsuario, datos) {
    // Validar datos de entrada
    const validatedData = validateWithZod(agregaCarritoSchema, datos);

    let carro = await Cart.findOne({ idUsuario });

    if (carro) {
      const posicionProducto = carro.productos.findIndex(
        (objeto) => objeto.idProducto.toString() === validatedData.idProducto,
      );

      if (posicionProducto > -1) {
        const producto = carro.productos[posicionProducto];
        producto.cantidadCarrito = validatedData.cantidadCarrito;
        carro.productos[posicionProducto] = producto;
      } else {
        carro.productos.push({
          idProducto: validatedData.idProducto,
          cantidadCarrito: validatedData.cantidadCarrito,
        });
      }
      await carro.save();
    } else {
      await Cart.create({
        idUsuario,
        productos: [
          { idProducto: validatedData.idProducto, cantidadCarrito: validatedData.cantidadCarrito },
        ],
      });
    }
  }

  /**
   * Procesa el pago: descuenta stock y vacía el carrito (con transacción)
   * @param {string} idUsuario - ID del usuario
   * @returns {Promise<Object>} Respuesta de pago exitoso
   * @throws {AppError} Si hay stock insuficiente
   */
  static async procesarPago(idUsuario) {
    const consulta = await Cart.findOne({ idUsuario });
    if (!consulta) {
      throw new Error('NO HAY PRODUCTOS PARA PAGAR');
    }

    const productosAConsultar = consulta.productos;

    // Iniciar sesión de MongoDB para transacción
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Validar stock antes de procesar
      for (let i = 0; i < productosAConsultar.length; i++) {
        const itemCarrito = productosAConsultar[i];
        const inventario = await Product.findOne({ _id: itemCarrito.idProducto }).session(session);

        if (!inventario) {
          continue;
        }

        // Validar stock insuficiente
        if (inventario.cantidadDisponible < itemCarrito.cantidadCarrito) {
          const error = new AppError(
            `Stock insuficiente para ${inventario.nombreProducto}`,
            400,
            'INSUFFICIENT_STOCK',
            {
              producto: inventario.nombreProducto,
              stock: inventario.cantidadDisponible,
              solicitado: itemCarrito.cantidadCarrito,
            },
          );
          await session.abortTransaction();
          session.endSession();
          throw error;
        }
      }

      // Descontar stock
      for (let i = 0; i < productosAConsultar.length; i++) {
        const itemCarrito = productosAConsultar[i];
        const inventario = await Product.findOne({ _id: itemCarrito.idProducto }).session(session);

        if (!inventario) {
          continue;
        }

        inventario.cantidadDisponible = inventario.cantidadDisponible - itemCarrito.cantidadCarrito;
        await inventario.save({ session });
      }

      // Eliminar carrito
      await Cart.findOneAndDelete({ idUsuario }).session(session);

      // Commit de la transacción
      await session.commitTransaction();
      session.endSession();

      return { msg: 'OK PAGO' };
    } catch (error) {
      // Si hay error, abortar transacción (solo si no fue abortada ya)
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      session.endSession();
      throw error;
    }
  }
}

module.exports = { ProductService, CartService };
