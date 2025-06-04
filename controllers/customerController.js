const Customer = require("../models/customer");

exports.createCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json({ message: "Customer created successfully!", customer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json(customers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: "Customer not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const [updated] = await Customer.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedCustomer = await Customer.findByPk(req.params.id);
            res.status(200).json({ message: "Customer updated successfully!", updatedCustomer });
        } else {
            res.status(404).json({ message: "Customer not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const deleted = await Customer.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json({ message: "Customer deleted successfully!" });
        } else {
            res.status(404).json({ message: "Customer not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
