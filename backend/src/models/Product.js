const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    nombreProducto: { type: String, required: true },
    imagenUrl: { type: String, required: true },
    cantidadDisponible: { type: Number, required: true },
    precioUnitario: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

// Keep collection name 'productoHP' for backward compatibility
module.exports = mongoose.model('productoHP', ProductSchema);
