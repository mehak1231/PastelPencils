const { sequelize } = require('../config/database'); // Fix import
const { DataTypes } = require('sequelize');

const Region = sequelize.define('Region', {
    regionid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Fix spelling of `autoIncrement`
    },
    RegionName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Region;
