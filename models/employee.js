const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // ✅ Correct import

const Employee = sequelize.define('Employee', {
    Empid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // ✅ Fix spelling mistake
    },
    FName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    LName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Deptid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Desigid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    doj: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    stateid: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    countryid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    regionid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Employee;
