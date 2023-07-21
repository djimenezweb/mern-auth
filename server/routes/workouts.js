const express = require('express');
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
// Añadimos el middleware requireAuth al router para que todas las rutas pasen por el middleware
// ¿Se podría restringir a unas pocas rutas?
router.use(requireAuth);

// GET all workouts
router.get('/', getWorkouts);

// GET single workout
router.get('/:id', getWorkout);

// POST new workout
router.post('/', createWorkout);

// DELETE single workout
router.delete('/:id', deleteWorkout);

// UPDATE single workout
router.patch('/:id', updateWorkout);

module.exports = router;
