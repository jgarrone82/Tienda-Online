import 'dotenv/config';
import 'express-async-errors'; // Must be imported before express
import express from 'express';
import './database.js';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import catalogRoutes from './routes/catalog.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/auth', authRoutes);
app.use('/api/catalogo', catalogRoutes);

// Centralized error handler (must be last)
app.use(errorHandler);

export default app;
