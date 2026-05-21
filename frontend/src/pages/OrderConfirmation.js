import { useLocation, Link } from 'react-router-dom';

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(price);
};

function OrderConfirmation() {
  const { state } = useLocation();
  const { orderId, cart } = state;
  const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  return (
  <div className="confirmation-page">
    
    {/* Animated checkmark */}
    <div className="confirmation-check">
      <svg viewBox="0 0 52 52">
        <circle className="check-circle" cx="26" cy="26" r="25" />
        <path className="check-tick" d="M14 27 l8 8 l16 -16" />
      </svg>
    </div>

    <h1 className="confirmation-title">Order Confirmed</h1>
    <p className="confirmation-message">Thank you for your purchase. Your order has been confirmed and will be shipped shortly.</p>

    {/* Order details box */}
    <div className="confirmation-box">
      <p className="order-number-label">ORDER NUMBER</p>
      <p className="order-number">#{orderId}</p>
      <div className="confirmation-divider" />
      <p className="order-details-label">ORDER DETAILS</p>
      {cart.map((item, i) => (
        <div key={i} className="confirmation-item">
          <span>{item.product_name} ({item.size}) × {item.quantity}</span>
          <span>{formatPrice(parseFloat(item.price) * item.quantity)}</span>
        </div>
      ))}
      <div className="confirmation-divider" />
      <div className="confirmation-item">
        <span>Shipping</span>
        <span>Free</span>
      </div>
      <div className="confirmation-total">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>

    <p className="confirmation-email">A confirmation email has been sent to your email address.</p>
    <p className="confirmation-delivery">Expected delivery: 2-5 business days</p>

    <Link to="/" className="confirmation-home">Return to Home</Link>

  </div>
);

}

export default OrderConfirmation;