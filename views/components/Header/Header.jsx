import React from 'react';
import './Header.css';

const Header = ({ shop, setShop }) => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Adorable Stationery, Just a Click Away</h2>
        <p>
          Discover a world of charming pens, pastel notebooks, and whimsical desk accessories - all crafted to add a touch of joy and creativity to your everyday tasks. At Kawaii Stationery, we believe cuteness and productivity go hand-in-hand!
        </p>
        <a 
          href="#explore-menu" 
          onClick={() => setShop("shop")} 
          className={shop === "shop" ? "active" : ""}
          style={{ textDecoration: 'none' }}
        >
          <button>
            Shop Now
          </button>
        </a>
      </div>
    </div>
  );
};

export default Header;


