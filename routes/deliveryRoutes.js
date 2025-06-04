const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryController");

router.post("/add", deliveryController.createDelivery);

module.exports = router;
