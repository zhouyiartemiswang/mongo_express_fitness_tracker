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
router.delete("/delete-exercise/:workoutId/:exerciseId", (req, res) => {

    db.Workout.findOne({ _id: req.params.workoutId }, function (err, result) {
        if (err) throw err;
        result.exercises.pull({ _id: req.params.exerciseId });
        result.save();
    })
        .then(() => {
            db.Exercise.deleteOne({ _id: req.params.exerciseId })
                .then(data => {
                    res.json(data);
                })
                .catch(err => {
                    res.json(err);
                });
        })
        .catch(err => {
            res.json(err);
        });

});

module.exports = router;