const Designation = require("../models/designation");

exports.createDesignation = async (req, res) => {
    try {
        const designation = await Designation.create(req.body);
        res.status(201).json({ message: "Designation created successfully!", designation });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllDesignations = async (req, res) => {
    try {
        const designations = await Designation.findAll();
        res.status(200).json(designations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getDesignationById = async (req, res) => {
    try {
        const designation = await Designation.findByPk(req.params.id);
        if (designation) {
            res.status(200).json(designation);
        } else {
            res.status(404).json({ message: "Designation not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateDesignation = async (req, res) => {
    try {
        const [updated] = await Designation.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedDesignation = await Designation.findByPk(req.params.id);
            res.status(200).json({ message: "Designation updated successfully!", updatedDesignation });
        } else {
            res.status(404).json({ message: "Designation not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteDesignation = async (req, res) => {
    try {
        const deleted = await Designation.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json({ message: "Designation deleted successfully!" });
        } else {
            res.status(404).json({ message: "Designation not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
