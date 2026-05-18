import React from 'react';

function Header() {
  return (
    <header className = "main-header">
        <div className = "top-row">
          <div className="title">AURELIA</div>
          <div className="search" role="button" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <div className="cart" role="button" aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 3h2l2.5 12.5a1 1 0 0 0 .98.75h9.04a1 1 0 0 0 .98-.78L21 7H6" />
              <circle cx="10" cy="19" r="1.2" />
              <circle cx="18" cy="19" r="1.2" />
            </svg>
          </div>
        </div>
    <div className="bottom-row">
            <a>WOMEN</a>
            <a>MEN</a>
            <a>ACCESSORIES</a>
        </div>
    </header>
  );
}

export default Header;