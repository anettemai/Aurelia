const express = require("express");
const pool = require("../db");
const router = express.Router();

// Routes will go here

// GET products with filtering
router.get("/", async (req, res) => {
    try{
        const category = req.query.category;
        const collection = req.query.collection;
        const keyword = req.query.keyword;

        // Validate if category is provided
        if (!category && !keyword) {
            return res.status(400).json({
                error: "Category parameter is required (Women, Men, or Exclusive)"
            });
        }

        //Start with basic query
        let query = "SELECT * FROM products";
        let conditions = [];
        let values = []; // This will store actual values

        if (category) {
            conditions.push(`category = $${values.length + 1}`);
            values.push(category);
        }

        if (collection) {
            conditions.push(`collection_id = $${values.length + 1}`);
            values.push(parseInt(collection));
        }

        if (keyword) {
            conditions.push(`keyword = $${values.length + 1}`);
            values.push(keyword);
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
        const productResult = await pool.query("SELECT * FROM products WHERE product_id = $1", [id]);

        // Check if the product exists
        if (productResult.rows.length === 0) {
            return res.status(404).json({ error: "Product not found."});
        }

        const imagesResult = await pool.query(
            "SELECT image_url, is_primary FROM product_images WHERE product_id = $1 ORDER BY is_primary DESC",
            [id]
        );

        const variantsResult = await pool.query(
            "SELECT size, stock_quantity FROM product_variants WHERE product_id = $1 ORDER BY variant_id",
            [id]
        );

        res.json({
            product: productResult.rows[0],
            images: imagesResult.rows,
            variants: variantsResult.rows
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;