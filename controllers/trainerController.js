const Trainer = require('../models/trainerModel');

// Create a new trainer
const createTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.create(req.body);
    res.status(201).json(trainer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all trainers (with optional filters)
const getAllTrainers = async (req, res) => {
  try {
    const filters = {};
    if(req.query.available) filters.available = req.query.available === 'true';
    if(req.query.specialization) filters.specialization = req.query.specialization;

    const trainers = await Trainer.find(filters);
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single trainer by ID
const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if(!trainer) return res.status(404).json({ error: "Trainer not found" });
    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update trainer
const updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if(!trainer) return res.status(404).json({ error: "Trainer not found" });
    res.status(200).json(trainer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete trainer
const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if(!trainer) return res.status(404).json({ error: "Trainer not found" });
    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer
};
