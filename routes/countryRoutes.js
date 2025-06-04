const express = require("express");
const router = express.Router();
const countryController = require("../controllers/countryController");

router.post("/add", countryController.create); 
router.get("/get", countryController.findAll);
router.get("/get/:id", countryController.findOne);
router.put("/update/:id", countryController.update); 
router.delete("/delete/:id", countryController.delete); 

module.exports = router;