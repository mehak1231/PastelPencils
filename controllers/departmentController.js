const Department = require("../models/department");

exports.createDepartment = async (req, res) => {
    try {
        const department = await Department.create(req.body);
        res.status(201).json({ message: "Department created successfully!", department });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.status(200).json(departments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (department) {
            res.status(200).json(department);
        } else {
            res.status(404).json({ message: "Department not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const [updated] = await Department.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedDepartment = await Department.findByPk(req.params.id);
            res.status(200).json({ message: "Department updated successfully!", updatedDepartment });
        } else {
            res.status(404).json({ message: "Department not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        const deleted = await Department.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json({ message: "Department deleted successfully!" });
        } else {
            res.status(404).json({ message: "Department not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
