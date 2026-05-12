const express = require("express");
const pool = require("../db");
const router = express.Router();

// Routes will go here

// GET products with filtering
router.get("/", async (req, res) => {
    try{
        const category = req.query.category;
        const collection = req.query.collection;

        // Validate if category is provided
        if (!category) {
            return res.status(400).json({
                error: "Category parameter is required (Women, Men, or Accessories)"
            });
        }

        //Start with basic query
        let query = "SELECT * FROM products";
        let conditions = [];
        let values = []; // This will store actual values

        if (category) {
            conditions.push("category = $1");
            values.push(category);
        }

        if (collection) {
            conditions.push("collection_id = $2");
            values.push(collection);
        }

        // Build the final query
        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        // Execute query
        const result = await pool.query(query, values);

        // Send response
        res.json({
            products:  result.rows,
            count: result.rows.length
        })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single product by ID
router.get("/:id", async (req, res)  => {
    try {

        const id = req.params.id;
        const result = await pool.query("SELECT * FROM products WHERE product_id = $1", [id]);

        // Check if the product exists
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Product not found."});
        }

        res.json({ product: result.rows[0] });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;