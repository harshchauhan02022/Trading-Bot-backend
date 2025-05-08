const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

// Category model
const Category = sequelize.define("categories", {
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
  timestamps: false // Since you don't have createdAt/updatedAt in DB
});

// User model
const User = require("./user.Model");

// Associations
Category.hasMany(User, { foreignKey: "categoryId" });
User.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = { Category, User };
