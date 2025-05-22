const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT, // must be a string like 'mysql'
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully!");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err.message);
  });

module.exports = sequelize;
