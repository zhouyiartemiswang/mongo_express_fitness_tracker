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
const htmlRoutes = require("./controllers/htmlController");
app.use(htmlRoutes);

const workoutRoutes = require("./controllers/workoutController");
app.use("/api", workoutRoutes);

const exerciseRoutes = require("./controllers/exerciseController");
app.use("/api", exerciseRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});