import { DataTypes } from 'sequelize';
import {sequelize} from './db.js';

const User = sequelize.define('users', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'customer' }  // ✅ important
}, {
  timestamps: false
});

export default User;
