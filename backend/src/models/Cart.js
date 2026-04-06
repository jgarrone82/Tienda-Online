const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    idUsuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UsuarioHP',
      required: true,
      unique: true,
    },
    productos: [
      {
        idProducto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'productoHP',
          unique: true,
        },
        cantidadCarrito: Number,
      },
    ],
    fechaModificado: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Cart', CartSchema);
