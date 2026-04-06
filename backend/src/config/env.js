require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

// En producción, JWT_SECRET es OBLIGATORIO
if (isProduction && !process.env.JWT_SECRET) {
  throw new Error('FATAL: JWT_SECRET debe estar configurado en producción');
}

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/tienda_db',
  JWT_SECRET:
    process.env.JWT_SECRET || (isProduction ? undefined : 'dev-secret-DO-NOT-USE-IN-PRODUCTION'),
  PORT: process.env.PORT || 4000,
  RATE_LIMIT_LOGIN: parseInt(process.env.RATE_LIMIT_LOGIN, 10) || 5,
  RATE_LIMIT_REGISTER: parseInt(process.env.RATE_LIMIT_REGISTER, 10) || 3,
};
