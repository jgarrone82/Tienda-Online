const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    usuario: { type: String, required: true, lowercase: true },
    correo: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true, select: true },
    signupDate: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.encriptarContrasena = async function (contrasenaIngresada) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(contrasenaIngresada, salt);
  return hash;
};

UserSchema.methods.compararContrasena = async function (contrasenaIngresada) {
  return await bcrypt.compare(contrasenaIngresada, this.contrasena);
};

// Keep collection name 'UsuarioHP' for backward compatibility
module.exports = mongoose.model('UsuarioHP', UserSchema);
