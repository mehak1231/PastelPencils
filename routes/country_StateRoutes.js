const express = require("express");
const router = express.Router();
const countryStateController = require("../controllers/country_StateController");

// To create a country-state mapping
router.post("/", countryStateController.createCountryState);

// To get all country-state mappings
router.get("/", countryStateController.getAllCountryStates);

// To delete a specific country-state mapping by ID
router.delete("/:id", countryStateController.deleteCountryState);

module.exports = router;