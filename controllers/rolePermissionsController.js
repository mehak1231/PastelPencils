// controllers/rolePermissionsController.js
const RolePermissions = require("../models/rolePermissions");

exports.createRolePermission = async (req, res) => {
    try {
        const rolePermission = await RolePermissions.create(req.body);
        res.status(201).json({ message: "Role-Permission mapping added successfully!", rolePermission });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllRolePermissions = async (req, res) => {
    try {
        const rolePermissions = await RolePermissions.findAll();
        res.status(200).json(rolePermissions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteRolePermission = async (req, res) => {
    try {
        const deleted = await RolePermissions.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json({ message: "Role-Permission mapping deleted successfully!" });
        } else {
            res.status(404).json({ message: "Mapping not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};