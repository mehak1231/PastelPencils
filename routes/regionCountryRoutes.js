// routes/regionCountryRoutes.js
const express = require("express");
const router = express.Router();
const regionCountryController = require("../controllers/regionCountryController");

router.post("/", regionCountryController.createRegionCountry);
router.get("/", regionCountryController.getAllRegionCountries);
router.delete("/:id", regionCountryController.deleteRegionCountry);

module.exports = router;