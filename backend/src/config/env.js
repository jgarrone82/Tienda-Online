require('dotenv').config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/tienda_db',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  PORT: process.env.PORT || 4000,
  RATE_LIMIT_LOGIN: parseInt(process.env.RATE_LIMIT_LOGIN, 10) || 5,
  RATE_LIMIT_REGISTER: parseInt(process.env.RATE_LIMIT_REGISTER, 10) || 3,
};
