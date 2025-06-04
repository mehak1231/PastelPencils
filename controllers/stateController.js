const States = require("../models/state");
// Create a new state
exports.createState = async (req, res) => {
  try {
    const { stateName } = req.body;
    if (!stateName) {
      return res.status(400).json({ error: "State name is required" });
    }
    const newState = await States.create({ stateName });
    res
      .status(201)
      .json({ message: "State created successfully", state: newState });
  } catch (error) {
    console.error("Error creating state:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all states
exports.getAllStates = async (req, res) => {
  try {
    const states = await States.findAll();
    res.status(200).json(states);
  } catch (error) {
    console.error("Error fetching states:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get state by ID
exports.getStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await States.findByPk(id);

    if (!state) {
      return res.status(404).json({ error: "State not found" });
    }
    res.status(200).json(state);
  } catch (error) {
    console.error("Error fetching state:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update state by ID
exports.updateState = async (req, res) => {
  try {
    const { id } = req.params;
    const { stateName } = req.body;

    const state = await States.findByPk(id);
    if (!state) {
      return res.status(404).json({ error: "State not found" });
    }

    state.stateName = stateName || state.stateName;
    await state.save();

    res.status(200).json({ message: "State updated successfully", state });
  } catch (error) {
    console.error("Error updating state:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete state by ID
exports.deleteState = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await States.findByPk(id);

    if (!state) {
      return res.status(404).json({ error: "State not found" });
    }

    await state.destroy();
    res.status(200).json({ message: "State deleted successfully" });
  } catch (error) {
    console.error("Error deleting state:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
