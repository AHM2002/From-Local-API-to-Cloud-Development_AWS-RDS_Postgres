// src/server.js
import express from 'express';
import dotenv from 'dotenv';
import {sequelize} from './db.js';
import authRoutes from './authRoutes.js';
import serviceRoutes from './serviceRoutes.js'; // your service routes
import userRoutes from './userRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import categoryRoutes from './categoryRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/services', serviceRoutes);
app.use('/users', userRoutes);

app.use('/bookings', bookingRoutes);
app.use('/categories', categoryRoutes);


// await sequelize.sync({ alter: true });

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to DB:', err));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
