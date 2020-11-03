const express = require("express");
const { Mongoose } = require("mongoose");
const mongojs = require("mongojs");
const router = express.Router();
const db = require("../models");

// Get exercise by id
router.get("/exercise/:id", (req, res) => {
    // console.log(req.params.id);
    // console.log(mongoose.ObjectId(req.params.id));
    db.Exercise.find({
        // name: "squat"
        // _id: req.params.id
    }, (error, exercise) => {
        if (error) {
            console.log(error);
        } else {
            res.json(exercise);
        }
    });
});

// API route to add exercise
// router.post("/add-exercise/", ({ body }, res) => {
//     db.Exercise.create(body)
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// API route to add exercise
// router.post("/add-exercise", (req, res) => {
//     db.Exercise.create(req.body)
//         .then(({ _id }) => db.Workout.findOneAndUpdate(
//             { _id: mongjs.ObjectId(req.params.workoutId) },
//             { $push: { exercises: _id } },
//             { new: true }
//         ))
//         // .then(({ _id }) => db.Workout.findAll({}).sort({day:-1}).limit(1))
//         .then(data => {
//             console.log(data);
//             res.json(data);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });
router.post("/add-exercise/:day", (req, res) => {
    db.Exercise.create(req.body)
        .then(({ _id }) => db.Workout.findOneAndUpdate(
            { day: req.params.day },
            { $push: { exercises: _id } },
            { new: true }
        ))
        // .then(({ _id }) => db.Workout.findAll({}).sort({day:-1}).limit(1))
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;

//  GET REQ : data-id  =  res._id on the button, so when you click on the button, you can retreive the id of the workout to add it to the end of your url

// const workoutId = this.attr("data-id")
// Post REQ :  URL : "/api/add-exercise/"+ workoutId