const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trackerdb", { useNewUrlParser: true });


// Require routes
const workoutRoutes = require('./controllers/resortController');
app.use("/api", workoutRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

// Back-End
// Database setup
    // Collection setup
        // WorkoutSchema (day, exercises)
        // ExerciseSchema (name, type, weight, sets, reps, duration, distance (for cardio))

// Front-End
    // Cardio page
    // Resistance page
    // Stats dashboard page