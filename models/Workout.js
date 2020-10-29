const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            name: {
                type: String,
                trim: true,
                required: "Enter an exercise name"
            },
            type: {
                type: String,
                trim: true,
                required: "Enter an exercise type"
            },
            weight: {
                type: Number,
                trim: true,
                required: "Enter an exercise weight"
            },
            sets: {
                type: Number,
                trim: true,
                required: "Enter exercise sets"
            },
            reps: {
                type: Number,
                trim: true,
                required: "Enter exercise reps"
            },
            duration: {
                type: Number,
                trim: true,
                required: "Enter an exercise duration"
            },
            distance: {
                type: Number,
                trim: true,
                required: "Enter an exercise distance"
            }
        }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
