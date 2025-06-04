import React, { useContext } from "react";
import "./StatItem.css";
import { images } from "../../images/images";
import { StoreContext } from "../../context/StoreContext";

const StatItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, toggleWishlist, isWishlisted, token } = useContext(StoreContext);

  const handleWishlistClick = () => {
    if (!token) {
      alert("Please sign in first!");
      return; // Show login popup
    }
    toggleWishlist(id);
  };

  const handleCartToggle = () => {
    if (!token) {
      alert("Please sign in first!");
      return; // Show login popup
    }
    
    if (cartItems[id]) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };

  return (
    <div className="stat-item">
      <div className="stat-item-img-container">
        <img className="stat-item-image" src={image} alt={name} />
        <div className="action-row">
          <button
            className={`add-to-cart-button ${cartItems[id] ? "added" : ""}`}
            onClick={handleCartToggle}
          >
            {cartItems[id] ? "Item Added" : "Add to Cart"}
          </button>
          <span
            className={`wishList ${isWishlisted(id) ? "wishlisted" : ""}`}
            onClick={handleWishlistClick}
          >
            {isWishlisted(id) ? "❤️" : "🖤"}
          </span>
        </div>
      </div>

      <div className="stat-item-info">
        <div className="stat-item-name-rating">
          <p>{name}</p>
          <img src={images.rating_starts} alt="" />
        </div>
        <p className="stat-item-desc">{description}</p>
        <p className="stat-item-price">Rs.{price}</p>
      </div>
    </div>
  );
};

export default StatItem;
