const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/auth"); // adjust path if needed

router.get("/", orderController.getAllOrders); // for admin
router.post("/", authMiddleware, orderController.createOrder); // user must be logged in
router.put("/:id", orderController.updateOrderStatus);
router.get("/user/:id", orderController.getUserOrdersByUserId);
router.post("/status", orderController.updateOrderStatus);



module.exports = router;
