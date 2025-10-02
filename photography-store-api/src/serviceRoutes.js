// src/serviceRoutes.js
import express from 'express';
import {Service} from './service.js'; // your Sequelize model
// const Service = require('./service.js');
import { authMiddleware } from './authMiddleware.js';

const router = express.Router();

// Create service
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, price, category_id  } = req.body;
    const service = await Service.create({ name, description, price, category_id});
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update service
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });

    await service.update(req.body);
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete service
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });

    await service.destroy();
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /services/bulk (Admin only)
router.post('/bulk', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const services = req.body.services; // [{title, description, price, category_id}, ...]

    const createdServices = await Service.bulkCreate(services);
    res.status(201).json({ message: "Bulk insert completed", services: createdServices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
