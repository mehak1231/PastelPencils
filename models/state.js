const { sequelize } = require("../config/database"); // Fix import
const { DataTypes } = require("sequelize");

const States = sequelize.define(
  "State",
  {
    stateid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stateName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "States", // Explicitly set table name
    timestamps: false, // Disable createdAt and updatedAt fields
    underscored: true, // Use snake_case column names
  }
);

module.exports = States;
