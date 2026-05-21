const express = require("express");
const pool = require("../db");
const router = express.Router();

// ADD to cart
router.post("/add", async (req, res) => {
    try {
        const productId = req.body.product_id;
        const quantity = req.body.quantity;
        const size = req.body.size;

        const result = await pool.query("SELECT * FROM products WHERE product_id = $1", [productId]);

        // Check if product exists
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if size is provided
        if (!size) {
            return res.status(400).json({ error: "Size is required" });
        }

        const product = result.rows[0];

        // Check if enough stock is available for the selected size
        const variantResult = await pool.query(`SELECT stock_quantity
            FROM product_variants
            WHERE product_id = $1
            AND size = $2`, [productId, size]);

        // If no variant found or not enough stock
        if (variantResult.rows.length === 0) {
            return res.status(400).json({ error: "Not enough stock available" });
        }

        // If cart doesn't exist, create it
        if (!req.session.cart) {
            req.session.cart = [];
        }

        // Check if item already exists
        const existingItem = req.session.cart.find(item => {
            return item.product_id === product.product_id && item.size === size;
        });

        // If it exists, update quantity, otherwise add new item
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            req.session.cart.push({
                product_id: product.product_id,
                quantity: quantity,
                price: product.price,
                product_name: product.product_name,
                product_image_url: product.product_image_url,
                size: size
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
        const userCart = req.session.cart.map(item => {
            return {
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price,
                product_name: item.product_name,
                product_image_url: item.product_image_url,
                size: item.size
            };
        });

        res.json({
            cart: userCart,
            total_items: req.session.cart.length
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

// UPDATE item quantity in cart
router.put("/update", async (req, res) => {
    try {
        const productId = req.body.product_id;
        const newQuantity = req.body.quantity;
        const size = req.body.size;

        // Check if the cart exists
        if (!req.session.cart) {
            return res.status(404).json({ error:"Cart is empty"});
        }

        // Find the item to update
        const itemToUpdate = req.session.cart.find(item => {
            return item.product_id === productId && item.size === size;
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
        const size = req.body.size;

        // Check if cart exists
        if (!req.session.cart) {
            return res.status(404).json({ error: "Cart is empty!" });
        }

        const beforeLength = req.session.cart.length;

        // Filter the cart and remove
        req.session.cart = req.session.cart.filter(item => {
            return item.product_id !== productId || item.size !== size;
        });

        //Check if anything was removed
        if (req.session.cart.length === beforeLength){
            return res.status(404).json({ error: "Item was not found in cart" });
        }

        res.json({ message: "Item removed from cart" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE order (place order/checkout)
router.post("/orders", async (req,res) => {
    try {
        const customerInfo = req.body.customer_info;
        
        // Check if cart exists and has items
        if (!req.session.cart || req.session.cart.length === 0){
            return res.status(400).json({ error: "Cart is empty!"});
        }

        // Create customer record
        const customerResult = await pool.query("INSERT INTO customers (" + 
            "customer_first_name, customer_last_name, customer_email, " +
            "customer_phone_number, customer_shipping_address) " +
            "VALUES ($1, $2, $3, $4, $5) RETURNING customer_id",
            [
                customerInfo.first_name,
                customerInfo.last_name,
                customerInfo.email,
                customerInfo.phone_number,
                customerInfo.shipping_address
            ]
        );

        const newCustomerId = customerResult.rows[0].customer_id;
        const orderDate = new Date();

        let totalPrice = 0;

        req.session.cart.forEach(item => {
            totalPrice = totalPrice + (item.quantity * parseFloat(item.price));
        });

        // Create order record
        const orderResult = await pool.query(`
            INSERT INTO orders (customer_id, order_date, 
            total_price, order_status) 
            VALUES ($1, $2, $3, $4) 
            RETURNING order_id`, [
                newCustomerId,
                orderDate,
                totalPrice,
                "pending"
            ]);

        const newOrderId = orderResult.rows[0].order_id;

        // Loop through each cart item
        for (const cartItem of req.session.cart) {
            await pool.query(`
               INSERT INTO order_item
               (order_id, product_id,
               selected_size, quantity, price_per_item)
               VALUES ($1, $2, $3, $4, $5)
               `, [
                newOrderId,
                cartItem.product_id,
                cartItem.size,
                cartItem.quantity,
                parseFloat(cartItem.price)
               ]);
        }

        // Clear the cart after successful checkout
        req.session.cart = [];

        // Send success response
        res.json({
            message: "Order placed successsfully!",
            orderId: newOrderId
        })
        

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;