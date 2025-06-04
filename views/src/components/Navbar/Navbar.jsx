import React, { useState, useContext } from "react";
import "./Navbar.css";
import { images } from "../../images/images";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

const Navbar = ({ setShowLogin }) => {
  const [shop, setShop] = useState("shop");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // state for search input
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput("");
      setMenuOpen(false);
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={images.logo} alt="Logo" className="logo" />
      </Link>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={menuOpen ? "bar change" : "bar"}></div>
        <div className={menuOpen ? "bar change" : "bar"}></div>
        <div className={menuOpen ? "bar change" : "bar"}></div>
      </div>

      <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <Link
          to="/"
          onClick={() => {
            setShop("home");
            setMenuOpen(false);
          }}
          className={shop === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="/shop"
          onClick={() => {
            setShop("shop");
            setMenuOpen(false);
          }}
          className={shop === "shop" ? "active" : ""}
        >
          New Arrivals
        </a>
        <Link
          to="/about"
          onClick={() => {
            setShop("about-us");
            setMenuOpen(false);
          }}
          className={shop === "about-us" ? "active" : ""}
        >
          About us
        </Link>
        <Link
          to="/contact"
          onClick={() => {
            setShop("contact-us");
            setMenuOpen(false);
          }}
          className={shop === "contact-us" ? "active" : ""}
        >
          Contact us
        </Link>
        <Link
          to="/app-download"
          onClick={() => setShop("mobile-app")}
          className={shop === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </Link>
      </ul>

      <div className="navbar-right">
        {/* Search input form */}
        <form className="navbar-search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="navbar-search-input"
          />
          <button type="submit" className="navbar-search-button">
            <img src={images.search_icon} alt="Search" />
          </button>
        </form>

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={images.basket_icon} alt="Cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        <div className="navbar-profile" style={{ position: "relative" }}>
          <button onClick={() => setShowDropdown(!showDropdown)}>👤</button>
          {showDropdown && (
            <ProfileDropdown
              setShowLogin={setShowLogin}
              setShowDropdown={setShowDropdown}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
