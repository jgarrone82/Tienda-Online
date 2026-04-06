const mongoose = require('mongoose');
const env = require('./config/env');

mongoose
  .connect(env.MONGODB_URI)
  .then(function () {})
  .catch(function () {});

mongoose.connection.on('close', () => {});
