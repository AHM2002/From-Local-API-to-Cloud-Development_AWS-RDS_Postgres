const express = require('express');
const router = express.Router();
const { Order, OrderItem, Product, User } = require('../models');
const sequelize = require('../config/db');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// POST /orders - create order (customer)
// src/routes/orders.js
router.post('/', authenticate, authorize('customer'), async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'items array is required' });
  }

  const t = await sequelize.transaction();
  try {
    let total = 0;
    const order = await Order.create({ userId: req.user.id, total: 0 }, { transaction: t });

    for (const it of items) {
      if (!it.productId || !it.quantity) {
        throw new Error('Each item must have productId and quantity');
      }

      const product = await Product.findByPk(it.productId, { transaction: t });
      if (!product) throw new Error(`Product not found: ID ${it.productId}`);

      const price = parseFloat(product.price);
      await OrderItem.create(
        { orderId: order.id, productId: product.id, quantity: it.quantity, price },
        { transaction: t }
      );

      total += price * it.quantity;
      await product.decrement('stock', { by: it.quantity, transaction: t });
    }

    order.total = total;
    await order.save({ transaction: t });
    await t.commit();

    // Return full order with items
    const createdOrder = await Order.findByPk(order.id, {
      include: [{ model: OrderItem, include: [Product] }]
    });

    res.status(201).json(createdOrder);

  } catch (err) {
    await t.rollback();
    console.error('Create order error:', err);
    res.status(400).json({ message: err.message });
  }
});

// GET /orders (admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: OrderItem, include: [Product] },
        { model: User, attributes: ['id','name','email'] }
      ]
    });
    res.json(orders);
  } catch (err) {
    console.error('List orders error:', err);
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: OrderItem, include: [Product] },
        { model: User, attributes: ['id','name','email'] }
      ]
    });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (req.user.role !== 'admin' && order.userId !== req.user.id) {
      return res.status(403).json({
        message: 'Forbidden: not owner or admin',
        yourRole: req.user.role
      });
    }

    res.json(order);

  } catch (err) {
    console.error('Get order by ID error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
