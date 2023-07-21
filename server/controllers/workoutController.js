const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');

// GET all workouts
const getWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  // Comprueba si el id es válido antes de buscarlo
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'Invalid ID' });
  }

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST new workout
const createWorkout = async (req, res) => {
  const { title, repetitions, load } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!repetitions) {
    emptyFields.push('repetitions');
  }
  if (!load) {
    emptyFields.push('load');
  }

  if (emptyFields.length > 0) {
    res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    // No hace falta convertir el objeto id a string
    // const user_id = req.user._id.toHexString();
    const user_id = req.user._id;
    const workout = await Workout.create({ title, repetitions, load, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE single workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  // Comprueba si el id es válido antes de buscarlo
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'Invalid ID' });
  }

  try {
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE single workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  // Comprueba si el id es válido antes de buscarlo
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'Invalid ID' });
  }

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body
      }
    );
    if (!workout) {
      return res.status(404).json({ error: 'Not found' });
    }
    // Devuelve el item original, no el actualizado
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getWorkout, getWorkouts, createWorkout, deleteWorkout, updateWorkout };
