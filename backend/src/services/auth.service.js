const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('../config/env');
const { ConflictError, UnauthorizedError } = require('../errors/AppError');

async function register({ nombre, correo, contrasena1 }) {
  const existingUser = await User.findOne({ correo });
  if (existingUser) {
    throw new ConflictError('No creado. Usuario ya existe en Database');
  }

  const nuevoUsuario = new User({ usuario: nombre, correo, contrasena: contrasena1 });
  nuevoUsuario.contrasena = await nuevoUsuario.encriptarContrasena(contrasena1);
  await nuevoUsuario.save();

  const token = jwt.sign({ _id: nuevoUsuario._id }, env.JWT_SECRET);

  return {
    resultado: 'SI',
    msg: 'Usuario creado correctamente. Ya puede iniciar sesión',
    token,
  };
}

async function login({ email, pass }) {
  const usuario = await User.findOne({ correo: email });
  if (!usuario) {
    throw new UnauthorizedError('Correo ingresado no existe');
  }

  const passValida = await usuario.compararContrasena(pass);
  if (!passValida) {
    throw new UnauthorizedError('Contraseña ingresada incorrecta.');
  }

  const token = jwt.sign({ _id: usuario._id }, env.JWT_SECRET);

  return {
    resultado: 'Autorizado',
    msg: 'Bienvenido(a) ' + usuario.usuario,
    token,
  };
}

module.exports = { register, login };
