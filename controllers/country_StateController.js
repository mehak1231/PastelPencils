const CountryState = require("../models/country_state");
// Creating a country state
exports.createCountryState = async (req, res) => {
    try {
        const countryState = await CountryState.create(req.body);
        res.status(201).json({ message: "Country-State mapping added successfully!", countryState });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllCountryStates = async (req, res) => {
    try {
        const countryStates = await CountryState.findAll();
        res.status(200).json(countryStates);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteCountryState = async (req, res) => {
    try {
        const deleted = await CountryState.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json({ message: "Country-State mapping deleted successfully!" });
        } else {
            res.status(404).json({ message: "Mapping not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
