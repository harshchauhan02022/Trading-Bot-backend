const sequelize = require("../../config/db");
const Category = require("./category.Model");
const User = require("./user.model");

Category.hasMany(User, { foreignKey: "categoryId" });
User.belongsTo(Category, { foreignKey: "catego ryId" });

module.exports = {
  sequelize,
  Category,
  User
};
