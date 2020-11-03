const express = require("express");
const { Mongoose } = require("mongoose");
const mongojs = require("mongojs");
const router = express.Router();
const db = require("../models");

// API route to add exercise
router.post("/add-exercise/:day", (req, res) => {
    db.Exercise.create(req.body)
        .then(({ _id }) => db.Workout.findOneAndUpdate(
            { day: req.params.day },
            { $push: { exercises: _id } },
            { new: true }
        ))
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

// Delete exercise from exercise collection and workout association
router.delete("/delete-exercise/:id", (req, res) => {
    db.Exercise.deleteOne({ _id: req.params.id })
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
    // db.Workout.update({}, { $unset: { _id: req.params.id } });
    db.Workout.exercises.pull({ _id: req.params.id });
});


module.exports = router;