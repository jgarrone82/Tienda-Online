import mongoose from 'mongoose';
import env from './config/env.js';

// Only connect if not in test environment and no active connection
if (process.env.NODE_ENV !== 'test' && mongoose.connection.readyState === 0) {
  mongoose
    .connect(env.MONGODB_URI)
    .then(function () {
      console.log('MongoDB connected successfully');
    })
    .catch(function (err) {
      console.error('MongoDB connection error:', err.message);
    });
}

mongoose.connection.on('close', () => {});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err.message);
});
