const Employee = require("../models/employee");

// Create a new employee
exports.createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json({ message: "Employee created successfully!", employee });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.status(200).json(employees);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get an employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
    try {
        const [updated] = await Employee.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedEmployee = await Employee.findByPk(req.params.id);
            res.status(200).json({ message: "Employee updated successfully!", updatedEmployee });
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
    try {
        const deleted = await Employee.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json({ message: "Employee deleted successfully!" });
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
