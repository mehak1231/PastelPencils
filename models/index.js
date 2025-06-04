const { sequelize, connectDB } = require("../config/database");
const User = require("./user");
const Order = require("./order");
const Product = require("./product");
const Country = require("./country");
const Customer = require("./customer");
const Employee = require("./employee");
const Department = require("./department");
const Designation = require("./designation");
const Region = require("./region");
const RegionCountry = require("./region_country");
const RolePermissions = require("./rolePermissions");
const Roles = require("./roles");
const State = require("./state");

const syncDB = async () => {
  await connectDB(); // Ensuring DB is connected before sync
  await sequelize.sync({ alter: true });
  console.log("Database synchronized");
};

require("./associations");

module.exports = { 
  sequelize, 
  User, 
  Order,
  Product, 
  Country, 
  Customer, 
  Employee, 
  Department, 
  Designation, 
  Region, 
  RegionCountry, 
  RolePermissions, 
  Roles, 
  State,
  syncDB 
};