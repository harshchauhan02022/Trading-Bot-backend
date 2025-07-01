module.exports = (sequelize, DataTypes) => {
 const Indicator = sequelize.define('Indicator', {
  symbol: {
   type: DataTypes.STRING,
   allowNull: false
  },
  type: {
   type: DataTypes.ENUM('rsi', 'macd', 'stochastic', 'bollinger'),
   allowNull: false
  },
  value: {
   type: DataTypes.JSON,
   allowNull: false
  },
  timeframe: {
   type: DataTypes.STRING,
   defaultValue: '1d'
  }
 }, {
  tableName: 'indicators',
  timestamps: true,
  indexes: [
   {
    unique: true,
    fields: ['symbol', 'type', 'timeframe']
   }
  ]
 });

 return Indicator;
};