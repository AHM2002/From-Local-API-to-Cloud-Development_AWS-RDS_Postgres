// category.js
import {sequelize} from './db.js';
import { DataTypes } from 'sequelize';
// import { Category } from './category.js';


export const Category = sequelize.define('categories', {
  name: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false
});

// module.exports = Category;
