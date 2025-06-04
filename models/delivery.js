const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Delivery = sequelize.define("Delivery", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  street: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  zipCode: DataTypes.STRING,
  country: DataTypes.STRING,
  phone: DataTypes.STRING,
  totalAmount: DataTypes.FLOAT,
});

module.exports = Delivery;
