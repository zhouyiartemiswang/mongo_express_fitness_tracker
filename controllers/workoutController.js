const express = require("express");
const router = express.Router();
const db = require("../models");

// Create a new workout
router.post("/create-workout", ({ body }, res) => {
    const workout = new db.Workout(body);
    db.Workout.create(workout)
    .then(newWorkout => {
        res.json(newWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

module.exports = router;