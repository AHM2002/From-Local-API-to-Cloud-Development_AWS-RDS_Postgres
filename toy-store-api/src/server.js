require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

(async () => {
  console.log('DB_HOST', process.env.DB_HOST);
  console.log('DB_USER', process.env.DB_USER);
// DO NOT print DB_PASSWORD to logs in production. For now if you want, you can print it to confirm: console.log('DB_PASSWORD', process.env.DB_PASSWORD);

  try {
    await sequelize.authenticate();
    console.log('DB connected');
    // Sync DB - in production use migrations. For lab, this auto-creates tables.
    await sequelize.sync({ alter: true });
    app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
})();
