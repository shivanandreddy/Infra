import Handover from "../models/handover.model.js";

// @desc    Create new handover
export const createHandover = async (req, res) => {
  try {
    const handover = await Handover.create(req.body);
    res.status(201).json(handover);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all handovers
export const getAllHandovers = async (req, res) => {
  try {
    const handovers = await Handover.find();
    res.status(200).json(handovers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update Handover by id
export const updateHandoverById = async (req, res) => {
  try {
    const handover = await Handover.findById(req.params.id);
    if (!handover)
      return res.status(404).json({ message: "Handover not found" });
    handover.set(req.body);
    await handover.save();
    res.status(200).json(handover);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete Handover by id
export const deleteHandoverById = async (req, res) => {
  try {
    const handover = await Handover.findByIdAndDelete(req.params.id);
    if (!handover)
      return res.status(404).json({ message: "Handover not found" });
    res.status(200).json({ message: "Handover deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// @desc   Duplicate Handover by id
export const duplicateHandoverById = async (req, res) => {
  try {
    const handover = await Handover.findById(req.params.id);
    if (!handover) return res.status(404).json({ message: "Handover not found" });
    // Convert mongoose document to plain object
    const handoverData = handover.toObject();
    // Remove _id so MongoDB generates a new one
    delete handoverData._id;
    // OPTIONAL: update fields if needed
    handoverData.shiftDate = new Date(); // example: new shift date
    const newHandover = await Handover.create(handoverData);
    res.status(201).json(newHandover);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
