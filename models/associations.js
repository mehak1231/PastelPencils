const Order = require("./order");
const User = require("./user");

User.hasMany(Order, { foreignKey: "userId", sourceKey: "userid" });
Order.belongsTo(User, { foreignKey: "userId", targetKey: "userid" });
