const User = require('./user.model');
const Category = require('./category.model');

// Define associations
Category.hasMany(User, { foreignKey: "categoryId" });
User.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = { User, Category };
