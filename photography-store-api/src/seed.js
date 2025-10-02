const bcrypt = require('bcryptjs');
const sequelize = require('./db');
const User = require('./user');
const Service = require('./service');
const Category = require('./category');

(async () => {
  try {
    await sequelize.sync({ force: true });

    const adminPass = await bcrypt.hash('Admin123!', 10);
    await User.create({
      name: 'Admin',
      email: 'admin@photo.com',
      password: adminPass,
      role: 'admin',
    });

    const cat1 = await Category.create({ name: 'Weddings' });
    const cat2 = await Category.create({ name: 'Portraits' });

    await Service.create({
      title: 'Wedding Photography',
      description: 'Full day coverage',
      price: 1200,
      category_id: cat1.id,
    });
    await Service.create({
      title: 'Portrait Session',
      description: 'Studio portrait',
      price: 150,
      category_id: cat2.id,
    });

    console.log('✅ Database seeded successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
})();
