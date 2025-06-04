const DeptDesig = require("../models/department_desig");
exports.createDeptDesig = async (req, res) => {
    try {
        const deptDesig = await DeptDesig.create(req.body);
        res.status(201).json({ message: "Department-Designation mapping added successfully!", deptDesig });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllDeptDesigs = async (req, res) => {
    try {
        const deptDesigs = await DeptDesig.findAll();
        res.status(200).json(deptDesigs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteDeptDesig = async (req, res) => {
    try {
        const deleted = await DeptDesig.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json({ message: "Department-Designation mapping deleted successfully!" });
        } else {
            res.status(404).json({ message: "Mapping not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
