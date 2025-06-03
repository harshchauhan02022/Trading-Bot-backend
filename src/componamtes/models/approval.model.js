module.exports = (sequelize, DataTypes) => {
 const Approval = sequelize.define('Approval', {
  id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true
  },
  user_id: DataTypes.INTEGER,
  status: {
   type: DataTypes.ENUM('pending', 'approved', 'rejected'),
   defaultValue: 'pending'
  }
 }, {
  tableName: 'approvals',
  timestamps: false
 });

 Approval.associate = (models) => {
  Approval.belongsTo(models.User, {
   foreignKey: 'user_id',
   as: 'user'
  });
 };

 return Approval;
};