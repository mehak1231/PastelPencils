// controllers/regionController.js
const Region = require("../models/region");

exports.createRegion = async (req, res) => {
    try {
        const region = await Region.create(req.body);
        res.status(201).json({ message: "Region created successfully!", region });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllRegions = async (req, res) => {
    try {
        const regions = await Region.findAll();
        res.status(200).json(regions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRegionById = async (req, res) => {
    try {
        const region = await Region.findByPk(req.params.id);
        if (region) {
            res.status(200).json(region);
        } else {
            res.status(404).json({ message: "Region not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateRegion = async (req, res) => {
    try {
        const [updated] = await Region.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedRegion = await Region.findByPk(req.params.id);
            res.status(200).json({ message: "Region updated successfully!", updatedRegion });
        } else {
            res.status(404).json({ message: "Region not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteRegion = async (req, res) => {
    try {
        const deleted = await Region.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json({ message: "Region deleted successfully!" });
        } else {
            res.status(404).json({ message: "Region not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
