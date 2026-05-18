import React from 'react';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <div className="footer-logo">AURELIA</div>
          <p className="muted">Sustainable luxury fashion crafted from nature's finest materials</p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li>Women</li>
            <li>Men</li>
            <li>Accessories</li>
            <li>New Arrivals</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>About</h4>
          <ul>
            <li>Our Story</li>
            <li>Sustainability</li>
            <li>Materials</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>Customer Service</li>
            <li>Store Locations</li>
            <li>Shipping</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 AURELIA. ALL RIGHTS RESERVED.</div>
        <div className="footer-links">
          <span>PRIVACY POLICY</span>
          <span>TERMS OF SERVICE</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
