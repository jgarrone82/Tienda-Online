require('dotenv').config();

const env = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/tienda_db',
  JWT_SECRET: process.env.JWT_SECRET,
  RATE_LIMIT_LOGIN: process.env.RATE_LIMIT_LOGIN || 5,
  RATE_LIMIT_REGISTER: process.env.RATE_LIMIT_REGISTER || 3,
};

module.exports = env;
