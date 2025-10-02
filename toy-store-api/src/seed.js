// src/seed.js
require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize, User, Category, Product } = require('./models');

(async () => {
  try {
    // Ensure tables are in sync
    await sequelize.sync({ alter: true });

    // Create Admin User
    const adminPw = await bcrypt.hash('Admin123!', 10);
    await User.findOrCreate({
      where: { email: 'admin@toystore.com' },
      defaults: { name: 'Admin', password: adminPw, role: 'admin' }
    });

    // Create or find Category
    const [cat] = await Category.findOrCreate({
      where: { name: 'Action Figures' },
      defaults: { description: 'Action figures & collectibles' }
    });

    // Create or find Product linked to category
    await Product.findOrCreate({
      where: { name: 'Superhero Figure' },
      defaults: {
        description: '12 inch',
        price: 24.99,
        stock: 10,
        categoryId: cat.id   // ✅ now cat is defined
      }
    });

    console.log('✅ Seeding done!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
})();
