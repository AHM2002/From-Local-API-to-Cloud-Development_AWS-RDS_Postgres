// booking.js
import { DataTypes } from 'sequelize';
import {sequelize} from './db.js';

export const Booking = sequelize.define('bookings', {
  booking_date: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },}, {
  timestamps: false   // ✅ disables createdAt & updatedAt
});

