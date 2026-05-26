import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(price);
};

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    shipping_address: '',
    city: '',
    postal_code: '',
    country: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_info: {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            phone_number: form.phone_number,
            shipping_address: `${form.shipping_address}, ${form.city}, ${form.postal_code}, ${form.country}`
          },
          cart_items: cart.map(item => ({
            product_id: item.product_id,
            size: item.size,
            quantity: item.quantity,
            price: item.price
          }))
        })
      });

      const data = await res.json();

      if (res.ok) {
        // Clear the cart after successful order
        await clearCart();
        navigate('/order-confirmation', { state: { orderId: data.orderId, cart } });
      } else {
        console.error('Order failed:', data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  return (
    <div className="checkout-page">

      <button className="back-to-cart" onClick={() => navigate('/cart')}>
        ← Back to Cart
      </button>

      {/* Header */}
      <div className="checkout-header">
        <h1 className="checkout-title">Secure Checkout</h1>
        <p className="checkout-secure">
          <img src="/Secure.svg" alt="Secure" className="checkout-icon" />
          ENCRYPTED &amp; SECURE PAYMENT
        </p>
      </div>

      <div className="checkout-layout">

        {/* Left: Form */}
        <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit}>

          {/* Contact Information */}
          <div className="checkout-section">
            <h2>Contact Information</h2>
            <div className="form-divider" />
            <label>EMAIL ADDRESS *</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label>PHONE NUMBER *</label>
            <input
              type="tel"
              name="phone_number"
              placeholder="+358 00 000 0000"
              value={form.phone_number}
              onChange={handleChange}
              required
            />
          </div>

          {/* Shipping Address */}
          <div className="checkout-section">
            <h2>Shipping Address</h2>
            <div className="form-divider" />
            <div className="form-row">
              <div className="form-group">
                <label>FIRST NAME *</label>
                <input
                  type="text"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>LAST NAME *</label>
                <input
                  type="text"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <label>ADDRESS *</label>
            <input
              type="text"
              name="shipping_address"
              value={form.shipping_address}
              onChange={handleChange}
              required
            />
            <div className="form-row">
              <div className="form-group">
                <label>CITY *</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>POSTAL CODE *</label>
                <input
                  type="text"
                  name="postal_code"
                  value={form.postal_code}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <label>COUNTRY *</label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              required
            />
          </div>

        </form>

        {/* Right: Order Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="checkout-summary-items">
            {cart.map((item, i) => (
              <div key={i} className="checkout-summary-item">
                <img
                  src={item.product_image_url}
                  alt={item.product_name}
                  onError={(e) => {
                    if (e.target.src.endsWith('.jpg')) {
                      e.target.src = item.product_image_url.replace('.jpg', '.png');
                    }
                  }}
                />
                <div className="checkout-item-info">
                  <p className="checkout-item-name">{item.product_name}</p>
                  <p className="checkout-item-size">Size: {item.size}</p>
                  <p className="checkout-item-price">{formatPrice(item.price)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-total">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>

          <button type="submit" form="checkout-form" className="complete-order-btn">
            Complete Order
          </button>
        </div>

      </div>
    </div>
  );
}

export default Checkout;