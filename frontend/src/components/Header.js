import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(price);
};

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, cart } = useCart();

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      navigate(`/search?q=${e.target.value.trim()}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="main-header">
      <div className="top-row">
        <Link
          to="/"
          className="title"
          style={{ cursor: isHome ? 'default' : 'pointer' }}
          onClick={() => setActiveDropdown(null)}
        >
          AURELIA
        </Link>

        {/* Search */}
        <div className="search-area">
          {searchOpen ? (
            <input
              className="search-input"
              type="text"
              placeholder="Search..."
              autoFocus
              onBlur={() => setSearchOpen(false)}
              onKeyDown={handleSearch}
            />
          ) : (
            <div className="search" role="button" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          )}
        </div>

        {/* Cart */}
        <div className="cart" role="button" aria-label="Cart" onClick={() => setCartOpen(!cartOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 3h2l2.5 12.5a1 1 0 0 0 .98.75h9.04a1 1 0 0 0 .98-.78L21 7H6" />
            <circle cx="10" cy="19" r="1.2" />
            <circle cx="18" cy="19" r="1.2" />
          </svg>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}

          {cartOpen && (
            <div className="cart-popup" onClick={e => e.stopPropagation()}>
              <h3>Your Cart</h3>
              {cart.length === 0 ? (
                <p className="cart-empty">Your cart is empty</p>
              ) : (
                <>
                  <ul className="cart-popup-items">
                    {cart.map((item, i) => (
                      <li key={i} className="cart-popup-item">
                        <img
                          src={item.product_image_url}
                          alt={item.product_name}
                          onError={(e) => {
                            if (e.target.src.endsWith('.jpg')) {
                              e.target.src = item.product_image_url.replace('.jpg', '.png');
                            }
                          }}
                        />
                        <div>
                          <p>{item.product_name}</p>
                          <p>{item.size} · Qty: {item.quantity}</p>
                          <p>{formatPrice(item.price)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="cart-popup-footer">
                    <Link to="/cart" onClick={() => setCartOpen(false)}>
                      Go to Cart
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bottom-row">
        <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown('women'); }}
          className={activeDropdown && activeDropdown !== 'women' ? 'hidden-nav' : ''}>
          WOMEN
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown('men'); }}
          className={activeDropdown && activeDropdown !== 'men' ? 'hidden-nav' : ''}>
          MEN
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown('exclusive'); }}
          className={activeDropdown && activeDropdown !== 'exclusive' ? 'hidden-nav' : ''}>
          EXCLUSIVE
        </a>
      </div>

      {activeDropdown && (
        <div className={`dropdown-content ${activeDropdown}`}>
          {activeDropdown === 'exclusive' ? (
            <>
              <Link to="/exclusive/ethereal-summer" onClick={() => setActiveDropdown(null)}>Ethereal Summer</Link>
              <Link to="/exclusive/bohemic-fall" onClick={() => setActiveDropdown(null)}>Bohemic Fall</Link>
            </>
          ) : (
            <>
              <Link to={`/${activeDropdown}/fall`} onClick={() => setActiveDropdown(null)}>Fall Collection '25</Link>
              <Link to={`/${activeDropdown}/spring`} onClick={() => setActiveDropdown(null)}>Spring Collection '26</Link>
              <Link to={`/${activeDropdown}/summer`} onClick={() => setActiveDropdown(null)}>Summer Collection '26</Link>
            </>
          )}
          <div className="view-all-wrapper">
            <div className="view-all-line"></div>
            <Link className="view-all-link" to={activeDropdown === 'exclusive' ? '/exclusive' : `/${activeDropdown}`} onClick={() => setActiveDropdown(null)}>VIEW ALL</Link>
          </div>
        </div>
      )}

      {(activeDropdown || cartOpen) && (
        <div 
          className="header-overlay" 
          onClick={() => { setActiveDropdown(null); setCartOpen(false); }}
        />
      )}
    </header>
  );
}

export default Header;