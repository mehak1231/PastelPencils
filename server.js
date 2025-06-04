require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { syncDB } = require("./models");

const app = express();

const PORT = process.env.PORT || 5000;



app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], 
  credentials: true
}));

app.use(express.json());

const path = require("path");

app.use("/images", express.static(path.join(__dirname, "views", "images")));
app.use("/uploads", express.static("uploads"));



// Import Routes
const adminRoutes = require("./routes/adminRoutes");
const countryRoutes = require("./routes/countryRoutes");
const productRoutes = require("./routes/productRoutes");
const customerRoutes = require("./routes/customerRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const designationRoutes = require("./routes/designationRoutes");
const regionRoutes = require("./routes/regionRoutes");
const regionCountryRoutes = require("./routes/regionCountryRoutes");
const rolePermissionsRoutes = require("./routes/rolePermissionsRoutes");
const rolesRoutes = require("./routes/rolesRoutes");
const stateRoutes = require("./routes/stateRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoute = require('./routes/orderRoute');
const deliveryRoutes = require('./routes/deliveryRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');


// Synchronize database before starting the server
syncDB()
  .then(() => {
    console.log("Database synchronized successfully");

    // Start server after DB sync
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/designations", designationRoutes);
app.use("/api/regions", regionRoutes);
app.use("/api/region-countries", regionCountryRoutes);
app.use("/api/role-permissions", rolePermissionsRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/users", userRoutes);
app.use('/api/orders', orderRoute);
app.use('/api/delivery', deliveryRoutes);
app.use('/api', invoiceRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to KawaiiEcommerce API");
});
