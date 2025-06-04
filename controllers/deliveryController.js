const Delivery = require("../models/delivery");

exports.createDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.create(req.body);
    res.status(201).json({ message: "Delivery info saved", delivery });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
