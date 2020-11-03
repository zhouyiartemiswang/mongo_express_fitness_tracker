const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const db = require("../models");
const path = require("path");

// Homepage
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/assets/index.html"));
});

// Create workout
router.get("/create-workout", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/assets/create.html"));
});

// View workout
router.get("/view-workout", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/assets/view.html"));
});

module.exports = router;