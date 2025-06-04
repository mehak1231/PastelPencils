const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
// admin routing for admin controller
router.get("/", adminController.showAdmin);
router.get("/login", adminController.showLogin);
router.post("/signup", adminController.signup); 
router.post("/login", adminController.login);
router.get("/logout", adminController.logout);

module.exports = router;