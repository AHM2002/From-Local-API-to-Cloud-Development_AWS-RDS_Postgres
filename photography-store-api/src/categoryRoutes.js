// categoryRoutes.js
import { authMiddleware } from './authMiddleware.js';
import auth from './authMiddleware.js';
import { Category } from './associations.js';
import express from 'express';

const router = express.Router();

// GET /categories — list all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /categories — create new category (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
