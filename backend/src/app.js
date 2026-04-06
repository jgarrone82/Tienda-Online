require('dotenv').config();
const express = require('express');
require('./database.js');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const catalogRoutes = require('./routes/catalog.routes');
const { errorHandler } = require('./middlewares/errorHandler.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/auth', authRoutes);
app.use('/api/catalogo', catalogRoutes);

// Centralized error handler (must be last)
app.use(errorHandler);

module.exports = app;
