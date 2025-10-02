// associations.js
import User from './user.js';
import {Service} from './service.js';
import {Booking} from './booking.js';
import { Category } from './category.js';


// Relationships
Category.hasMany(Service, { foreignKey: 'category_id' });
Service.belongsTo(Category, { foreignKey: 'category_id' });

User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

Service.hasMany(Booking, { foreignKey: 'service_id' });
Booking.belongsTo(Service, { foreignKey: 'service_id' });

export { User, Service, Booking, Category };
