const Permissions = require("../models/permission");
exports.createPermission = async (req, res) => {
    try {
        const permission = await Permissions.create(req.body);
        res.status(201).json({ message: "Permission added successfully!", permission });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permissions.findAll();
        res.status(200).json(permissions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getPermissionById = async (req, res) => {
    try {
        const permission = await Permissions.findByPk(req.params.id);
        if (permission) {
            res.status(200).json(permission);
        } else {
            res.status(404).json({ message: "Permission not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updatePermission = async (req, res) => {
    try {
        const [updated] = await Permissions.update(req.body, { where: { Permissionsid: req.params.id } });
        if (updated) {
            res.status(200).json({ message: "Permission updated successfully!" });
        } else {
            res.status(404).json({ message: "Permission not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deletePermission = async (req, res) => {
    try {
        const deleted = await Permissions.destroy({ where: { Permissionsid: req.params.id } });
        if (deleted) {
            res.status(204).json({ message: "Permission deleted successfully!" });
        } else {
            res.status(404).json({ message: "Permission not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
