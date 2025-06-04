const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,  // Ensure the port is used
    dialect: 'mysql',
    logging: console.log,  // Enables SQL query logging for debugging
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL connected Successfully');
    } catch (error) {
        console.error('DB connection Failed:', error.message);
    }
};

module.exports = { sequelize, connectDB };
