const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull:false },
  description: DataTypes.TEXT,
  price: { type: DataTypes.DECIMAL(10,2), allowNull:false },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'products', underscored: true });

module.exports = Product;
