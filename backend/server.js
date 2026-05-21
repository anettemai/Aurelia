const express = require("express");
const cors = require("cors");
const pool = require("./db");
const session = require("express-session");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Session middleware
app.use(session({
    secret: 'aurelia-luxury-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false} // Set to true in production with HTTPS
}));

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
            error: err.message
        });
    }
});

// Import and use product routes
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

const cartRoutes = require("./routes/checkout");
app.use("/api/cart", cartRoutes);

const orderRoutes = require("./routes/orders");
app.use("/api/orders", orderRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

