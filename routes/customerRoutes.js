const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.post("/add", customerController.createCustomer);
router.get("/get", customerController.getAllCustomers);
router.get("/get/:id", customerController.getCustomerById);
router.put("/update/:id", customerController.updateCustomer);
router.delete("/delete/:id", customerController.deleteCustomer);

module.exports = router;
