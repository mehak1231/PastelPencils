const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true, // Image is optional at the time of product creation
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Product name is mandatory
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false, // Description is mandatory
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false, // Product price is mandatory
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false, // Category is mandatory
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false, // Stock is mandatory
  },
});

module.exports = Product;
