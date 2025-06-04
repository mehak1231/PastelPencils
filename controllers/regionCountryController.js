// controllers/regionCountryController.js
const RegionCountry = require("../models/region_country");

exports.createRegionCountry = async (req, res) => {
    try {
        const entry = await RegionCountry.create(req.body);
        res.status(201).json({ message: "Region-Country mapping added successfully!", entry });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllRegionCountries = async (req, res) => {
    try {
        const entries = await RegionCountry.findAll();
        res.status(200).json(entries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteRegionCountry = async (req, res) => {
    try {
        const deleted = await RegionCountry.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json({ message: "Region-Country mapping deleted successfully!" });
        } else {
            res.status(404).json({ message: "Mapping not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};