const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Category = sequelize.define("Category", {
 name: {
  type: DataTypes.STRING,
  allowNull: false
 },
 trading_amount: {
  type: DataTypes.INTEGER,
  allowNull: false
 }
}, {
 tableName: "categories",
 timestamps: false
});

const User = sequelize.define("User", {

}, {
 tableName: "users",
 timestamps: false
});

module.exports = { Category, User };
