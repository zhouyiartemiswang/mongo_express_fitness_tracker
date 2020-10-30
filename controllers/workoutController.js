const express = require("express");
const router = express.Router();
const db = require("../models");

// Create a new workout
router.post("/create", ({ body }, res) => {
    db.Workout.create(body);
});

// Create a new exercise
router.post("/create", ({ body }, res) => {
    db.Workout.create(body);
});