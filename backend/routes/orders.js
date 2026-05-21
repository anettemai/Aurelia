const express = require("express");
const pool = require('../db');
const router = express.Router();

// GET single order details
router.get("/:id", async (req, res) => {
    try {
        const orderId = req.params.id;

        // Get order details with customer info
        const orderResult = await pool.query(`
            SELECT 
                o.order_id,
                o.order_date, 
                o.total_price,
                o.order_status,
                c.customer_first_name,
                c.customer_last_name,
                c.customer_email
            FROM orders o
            JOIN customers c ON o.customer_id = c.customer_id  
            WHERE o.order_id = $1
        `, [orderId]
        );

        // Check if order exists
        if (orderResult.rows.length === 0) {
            return res.status(404).json({ error: "Order not found!" });
        }

        const orderInfo = orderResult.rows[0];

        // Get order items with product names
        const itemsResult = await pool.query(`
            SELECT 
                oi.selected_size,
                oi.quantity, 
                oi.price_per_item,
                p.product_name
            FROM order_item oi
            JOIN products p ON oi.product_id = p.product_id
            WHERE oi.order_id = $1
            `, [orderId]);

        // Combine order info and items into a single response object
        res.json({
            order: {
                order_id: orderInfo.order_id,
                order_date: orderInfo.order_date,
                total_price: orderInfo.total_price,
                order_status: orderInfo.order_status,
                customer: {
                    first_name: orderInfo.customer_first_name,
                    last_name:  orderInfo.customer_last_name,
                    email: orderInfo.customer_email
                }
            },
            items: itemsResult.rows
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;