const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Your Sequelize instance

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  status: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  totalAmount: DataTypes.FLOAT,
  address: DataTypes.JSON,
  items: DataTypes.JSON, // Array of items [{ name, price, quantity }]
}, {
  tableName: 'orders',
  timestamps: false,
});

module.exports = Order;