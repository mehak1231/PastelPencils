const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database"); 

const Country = sequelize.define("Country", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Country;
