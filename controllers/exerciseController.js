const express = require("express");
const router = express.Router();
const db = require("../models");

// API route to add exercise
router.post("/add-exercise", ({ body }, res) => {
    db.Exercise.create(body)
        .then(newExercise => {
            res.json(newExercise);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;