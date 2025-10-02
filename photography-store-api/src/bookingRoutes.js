// bookingRoutes.js
import { Booking, User, Service } from './associations.js';
import authMiddleware from './authMiddleware.js';
import express from 'express';  
const router = express.Router();

// GET /bookings (Admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Service, attributes: ['id', 'name'] }
      ]
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /bookings (Customer creates booking)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { service_id, booking_date } = req.body;
    const booking = await Booking.create({
      user_id: req.user.id,
      service_id,
      booking_date
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
