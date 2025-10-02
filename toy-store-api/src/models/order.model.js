const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
  total: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
  status: { type: DataTypes.STRING, defaultValue: 'pending' }
}, { tableName: 'orders', underscored: true });

module.exports = Order;
