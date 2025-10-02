const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
  name: { type: DataTypes.STRING, allowNull:false, unique:true },
  description: DataTypes.TEXT
}, { tableName: 'categories', underscored: true });

module.exports = Category;
