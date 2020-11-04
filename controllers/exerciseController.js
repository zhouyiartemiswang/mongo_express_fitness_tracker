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
    console.log(req.params.workoutId);
    console.log(req.params.exerciseId);

    db.Workout.findOneAndUpdate(
        { _id: req.params.workoutId },
        { $pull: { exercises: { _id: req.params.exerciseId } } },
        { new: true })
        .then(data => {
            // res.json(data);
            db.Exercise.deleteOne({ _id: req.params.exerciseId })
                .then(data => {
                    console.log(data);
                    res.json(data);
                })
                .catch(err => {
                    res.json(err);
                });
        })
        .catch(err => {
            res.json(err);
        });

    // db.Exercise.deleteOne({ _id: req.params.exerciseId })
    //     .then(data => {
    //         console.log(data);
    //         res.json(data);
    //     })
    //     .catch(err => {
    //         res.json(err);
    //     });
});


module.exports = router;