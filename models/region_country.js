const { sequelize } = require('../config/database'); // Fix import
const { DataTypes } = require('sequelize');

const Region_Country = sequelize.define('Region_Country', {
    regionid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    countryid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Region_Country;
