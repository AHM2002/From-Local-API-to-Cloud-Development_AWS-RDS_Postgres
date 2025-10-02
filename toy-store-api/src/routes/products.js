const express = require('express');
const router = express.Router();
const { Product, Category } = require('../models');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// GET /products
router.get('/', async (req, res) => {
  const products = await Product.findAll({ include: Category });
  res.json(products);
});

// GET /products/:id
router.get('/:id', async (req,res) => {
  const p = await Product.findByPk(req.params.id, { include: Category });
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
});

// POST /products (admin only)
router.post('/', authenticate, authorize('admin'), async (req,res) => {
  const { name, description, price, stock, categoryId } = req.body;
  const p = await Product.create({ name, description, price, stock, categoryId });
  res.status(201).json(p);
});

// POST /products/bulk (admin only)
// src/routes/products.js (add this endpoint)
router.post('/bulk', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { products } = req.body;

    // Validate input
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'products array is required' });
    }

    for (const p of products) {
      if (!p.name || !p.price || !p.categoryId) {
        return res.status(400).json({ message: 'Each product must have name, price, categoryId' });
      }
    }

    const created = await Product.bulkCreate(products);
    res.status(201).json(created);

  } catch (err) {
    console.error('Bulk add error:', err);
    res.status(500).json({ message: err.message });
  }
});

// PUT /products/:id (admin only)
router.put('/:id', authenticate, authorize('admin'), async (req,res) => {
  const p = await Product.findByPk(req.params.id);
  if (!p) return res.status(404).json({ message:'Not found' });
  await p.update(req.body);
  res.json(p);
});

// DELETE /products/:id (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req,res) => {
  const p = await Product.findByPk(req.params.id);
  if (!p) return res.status(404).json({ message:'Not found' });
  await p.destroy();
  res.json({ message:'Deleted' });
});

module.exports = router;
