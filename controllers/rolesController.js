const Roles = require("../models/roles");
exports.createRole = async (req, res) => {
    try {
        const role = await Roles.create(req.body);
        res.status(201).json({ message: "Role added successfully!", role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Roles.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getRoleById = async (req, res) => {
    try {
        const role = await Roles.findByPk(req.params.id);
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ message: "Role not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateRole = async (req, res) => {
    try {
        const [updated] = await Roles.update(req.body, { where: { roleid: req.params.id } });
        if (updated) {
            res.status(200).json({ message: "Role updated successfully!" });
        } else {
            res.status(404).json({ message: "Role not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteRole = async (req, res) => {
    try {
        const deleted = await Roles.destroy({ where: { roleid: req.params.id } });
        if (deleted) {
            res.status(204).json({ message: "Role deleted successfully!" });
        } else {
            res.status(404).json({ message: "Role not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
