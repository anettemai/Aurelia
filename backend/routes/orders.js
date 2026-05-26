const express = require("express");
const pool = require('../db');
const router = express.Router();

// POST create new order
router.post('/', async (req, res) => {
  const { customer_info, cart_items } = req.body;

  try {
    // Check if customer exists, if not create one
    let customerResult = await pool.query(
      `SELECT customer_id FROM customers WHERE customer_email = $1`,
      [customer_info.email]
    );
    
    let customerId;
    if (customerResult.rows.length > 0) {
      customerId = customerResult.rows[0].customer_id;
    } else {
      const newCustomerResult = await pool.query(
        `INSERT INTO customers (customer_first_name, customer_last_name, customer_email, customer_phone_number, customer_shipping_address)
         VALUES ($1, $2, $3, $4, $5) RETURNING customer_id`,
        [customer_info.first_name, customer_info.last_name, customer_info.email,
         customer_info.phone_number, customer_info.shipping_address]
      );
      customerId = newCustomerResult.rows[0].customer_id;
    }

    // Calculate total
    const total = cart_items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

    // Create order
    const orderResult = await pool.query(
      `INSERT INTO orders (customer_id, total_price, order_status, order_date)
       VALUES ($1, $2, 'pending', NOW()) RETURNING order_id`,
      [customerId, total]
    );
    const orderId = orderResult.rows[0].order_id;

    // Insert order items
    for (const item of cart_items) {
      await pool.query(
        `INSERT INTO order_item (order_id, product_id, selected_size, quantity, price_per_item)
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, item.product_id, item.size, item.quantity, item.price]
      );
    }

    res.json({ orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;