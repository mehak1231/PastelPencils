const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Users = sequelize.define("User", {
  userid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  roleid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Users;