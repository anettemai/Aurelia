const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database test route
app.get("/db-test", async (req, res) => {
    try {
         const result = await pool.query("SELECT COUNT(*) FROM products");
         res.json({
            message: "Database connected successfully!",
            productCount: result.rows[0].count
        });
    } catch (err) {
        res.status(500).json({
            error: err.messgae
        });
    }
});

// Database test route
app.get("/db-test", (req, res) => {
    res.send("DB route disabled for testing");
});

// Import and use product routes
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

