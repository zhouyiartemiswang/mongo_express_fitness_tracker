const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: "Enter an exercise type"
    },
    name: {
        type: String,
        trim: true,
        required: "Enter an exercise name"
    },
    weight: {
        type: Number,
        trim: true
        // required: "Enter an exercise weight"
    },
    sets: {
        type: Number,
        trim: true
        // required: "Enter exercise sets"
    },
    reps: {
        type: Number,
        trim: true
        // required: "Enter exercise reps"
    },
    duration: {
        type: Number,
        trim: true
        // required: "Enter an exercise duration"
    },
    distance: {
        type: Number,
        trim: true
        // required: "Enter an exercise distance"
    }

});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;