const express = require("express");
const pool = require("../db");
const router = express.Router();

// ADD to cart
router.post("/add", async (req, res) => {
    try {
        const productId = req.body.product_id;
        const quantity = req.body.quantity;

        const result = await pool.query("SELECT * FROM products WHERE product_id = $1", [productId]);

        // Check if product exists
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        const product = result.rows[0];

        // If cart doesn't exist, create it
        if (!req.session.cart) {
            req.session.cart = [];
        }

        // Check if item already exists
        const existingItem = req.session.cart.find(item => {
            return item.product_id === product.product_id;
        });

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            req.session.cart.push({
                product_id: product.product_id,
                quantity: quantity,
                price: product.price,
                product_name: product.product_name,
                product_image_url: product.product_image_url
            });
        }

        res.json({ message: "Product added to cart" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET cart contents
router.get("/", async (req, res) => {
    try {

        // If cart doesn't exist
        if (!req.session.cart){
            return res.json({
                cart: [],
                total_items: 0
            });
        }

        // Transform the cart to remove product_id
        const userFriendlyCart = req.session.cart.map(item => {
            return {
                quantity: item.quantity,
                price: item.price,
                product_name: item.product_name,
                product_image_url: item.product_image_url
            };
        });

        res.json({
            cart: userFriendlyCart,
            total_items: req.session.cart.length
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

// UPDATE item quantity in cart
router.put("/update", async, (req, res) => {
    try {
        const productId = req.body.product_id;
        const newQuantity = req.body.quantity;

        // Check if the cart exists
        if (!req.session.cart) {
            return res.status(404).json({ error:"Cart is empty"});
        }

        // Find the item to update
        const itemToUpdate = req.session.cart.find(item => {
            return item.product_id = productId;
        });

        // If item not found
        if (!itemToUpdate) {
            return res.status(404).json({ error: "Item not found in cart" });
        }

        // Update the quantity
        itemToUpdate.quantity = newQuantity;

        res.json({ message: "Cart updated successfully!" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// REMOVE item from cart
router.delete("/remove", async (req,res) => {
    try{
        const productId = req.body.product_id;

        // Check if cart exists
        if (!req.session.cart) {
            return res.status(404).json({ error: "Cart is empty!" });
        }

        const beforeLength = req.session.cart.length;

        // Filter the cart and remove
        req.session.cart = req.session.cart.filter(item => {
            return item.product_id !== productId;
        });

        //Check if anything was removed
        if (req.session.cart.length === beforeLength){
            return res.status(404).json({ error: "Item was not found in cart" });
        }

        res.json({ message: "Ittem removed from cart" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;