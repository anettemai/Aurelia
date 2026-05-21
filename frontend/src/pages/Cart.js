import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(price);
};

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const total = subtotal;

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-title">Your Selection</h1>
        <p className="cart-empty-msg">Your cart is empty.</p>
        <Link to="/" className="continue-shopping">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Selection</h1>
      <p className="cart-item-count">{cart.length} {cart.length === 1 ? 'Item' : 'Items'}</p>

      <div className="cart-layout">

        {/* Left: Items */}
        <div className="cart-items">
          {cart.map((item, i) => (
            <div key={i} className="cart-item">
              <img 
                src={item.product_image_url} 
                alt={item.product_name}
                onError={(e) => {
                  if (e.target.src.endsWith('.jpg')) {
                    e.target.src = item.product_image_url.replace('.jpg', '.png');
                  }
                }}
              />
              <div className="cart-item-details">
                <p className="cart-item-name">{item.product_name}</p>
                <p className="cart-item-size">SIZE &nbsp; {item.size}</p>
                <div className="cart-item-quantity">
                  <span className="qty-label">QUANTITY</span>
                  <div className="qty-controls">
                    <button onClick={() => updateQuantity(item.product_id, item.size, Math.max(1, item.quantity - 1))}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product_id, item.size, item.quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
              <div className="cart-item-right">
                <button className="remove-btn" onClick={() => removeFromCart(item.product_id, item.size)}>✕</button>
                <div className="cart-item-subtotal">
                  <p className="subtotal-label">PRICE</p>
                  <p className="subtotal-price">{formatPrice(parseFloat(item.price) * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <Link to="/checkout" className="proceed-btn">Proceed to Checkout</Link>
          <button className="continue-shopping" onClick={() =>navigate(-2)}>
            Continue Shopping
          </button>

          <div className="cart-perks">
            <div className="perk">
              <img src="/Shipping.svg" alt="Shipping" className="perk-icon" />
              <div>
                <p>Complimentary Shipping</p>
                <p>Free express delivery</p>
              </div>
            </div>
            <div className="perk">
              <img src="/Secure.svg" alt="Secure" className="perk-icon" />
              <div>
                <p>Secure Payment</p>
                <p>Protected transactions</p>
              </div>
            </div>
            <div className="perk">
               <img src="/Star.svg" alt="Luxury" className="perk-icon" />
              <div>
                <p>Luxury Packaging</p>
                <p>Signature presentation</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;