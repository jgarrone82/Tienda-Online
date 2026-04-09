const mongoose = require('mongoose');
const env = require('./config/env');

// Only connect if not in test environment and no active connection
if (process.env.NODE_ENV !== 'test' && mongoose.connection.readyState === 0) {
  mongoose
    .connect(env.MONGODB_URI)
    .then(function () {})
    .catch(function () {});
}

mongoose.connection.on('close', () => {});
