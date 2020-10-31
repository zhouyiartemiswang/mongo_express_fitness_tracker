const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const db = require("../models");

// Get all workouts 
router.get("/workout/all", (req, res) => {
    db.Workout.find({}, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.json(data);
        }
    });
});

// Populate a workout
router.get("/view-workout", (req, res) => {
    db.Workout.find({})
        .populate({path: "exercises"})
        .exec((error, data) => {
            if (error) return handleError(error);
            res.json(data);
        })
        // .then(data => {
        //     // console.log("here");
        //     res.json(data);
        // })
        // .catch(err => {
        //     res.json(err);
        // });
});

// Get all exercises
router.get("/exercise/all", (req, res) => {
    db.Exercise.find({}, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.json(data);
        }
    });
});

// Get exercise by id
router.get("/exercise/:id", (req, res) => {
    // console.log(req.params.id);
    // console.log(mongoose.ObjectId(req.params.id));
    db.Exercise.find({
        name: "squat"
        // _id: mongoose.ObjectId(req.params.id)
    }, (error, exercise) => {
        if (error) {
            console.log(error);
        } else {
            res.json(exercise);
        }
    });
});

module.exports = router;