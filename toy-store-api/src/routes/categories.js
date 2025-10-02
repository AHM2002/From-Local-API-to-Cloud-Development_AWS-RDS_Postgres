const express = require('express');
const router = express.Router();
const { Category } = require('../models');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// GET /categories
router.get('/', async (req, res) => {
  try {
    const cats = await Category.findAll();
    res.json(cats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /categories  - admin only
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const cat = await Category.create({ name, description });
    res.status(201).json(cat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /categories/:id  - admin only
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const cat = await Category.findByPk(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    await cat.update(req.body);
    res.json(cat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /categories/:id  - admin only
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const cat = await Category.findByPk(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    await cat.destroy();
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET /categories - list categories
  router.get('/', async (req, res) => {
  const cats = await Category.findAll();
  res.json(cats);
});

module.exports = router;
