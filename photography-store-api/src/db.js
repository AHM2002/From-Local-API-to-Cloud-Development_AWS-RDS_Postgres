import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

console.log("Loaded DB password:", process.env.DB_PASS); // TEMP debug

// ... Sequelize init


const sequelize = new Sequelize(
  process.env.DB_NAME,     // photostore_db
  process.env.DB_USER,     // photostoreapi
  process.env.DB_PASS, // your password
  {
    host: process.env.DB_HOST, // RDS endpoint
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // for self-signed certs on AWS RDS
      }
    }
  }
);

export {sequelize};
