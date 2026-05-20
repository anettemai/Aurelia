import React, { useState} from 'react';
import { Link, useLocation } from 'react-router-dom';


function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
    console.log('activeDropdown is now:', activeDropdown === menu ? null : menu);
  };
  return (
    <header className = "main-header">
        <div className = "top-row">
          <Link 
          to="/" 
          className="title"
          style={{ cursor: isHome ? 'default' : 'pointer' }}
          onClick={() => setActiveDropdown(null)}
        >
          AURELIA
        </Link>
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
    </header>
  );
}

export default Header;