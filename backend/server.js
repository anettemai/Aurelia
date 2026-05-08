const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Aurelia backend is running");
});

// Database test route
app.get("/db-test", (req, res) => {
    res.send("DB route disabled for testing");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

