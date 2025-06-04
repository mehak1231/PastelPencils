const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // ✅ Correct import

const Designations = sequelize.define('Designation', {
    desigid: {
        type: DataTypes.INTEGER,
        primaryKey: true,  // ✅ Fix typo
        autoIncrement: true,  // ✅ Fix typo
        allowNull: false,
    },
    desigName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Designations; // ✅ Correct export
