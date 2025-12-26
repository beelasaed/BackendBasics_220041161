const express = require('express');
const router = express.Router();
const {
  createTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer
} = require('../controllers/trainerController');

// CRUD routes
router.post('/', createTrainer);
router.get('/', getAllTrainers);
router.get('/:id', getTrainerById);
router.patch('/:id', updateTrainer);
router.delete('/:id', deleteTrainer);

module.exports = router;
