const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // ✅ Correct import

const Departments = sequelize.define('Department', {
    deptid: {
        type: DataTypes.INTEGER,
        primaryKey: true,  // ✅ Fix typo
        autoIncrement: true,  // ✅ Fix typo
        allowNull: false,
    },
    dname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Departments; // ✅ Correct export
