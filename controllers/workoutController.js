const express = require("express");
const router = express.Router();
const db = require("../models");

// Get all workout
router.get("/workout/all", (req, res) => {
    db.Workout.find({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

// Get workout id
router.get("/workout/:day", (req, res) => {
    db.Workout.find(
        {
            day: req.params.day
        })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

// Populate a workout
router.get("/view-workout", (req, res) => {
    db.Workout.find({})
        .populate("exercises")
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

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