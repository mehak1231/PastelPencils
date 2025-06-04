
import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './SearchResults.css';

const SearchResults = () => {
  const {
    item_list,
    cartItems,
    addToCart,
    removeFromCart,
    toggleWishlist,
    isWishlisted,
  } = useContext(StoreContext);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const results = item_list.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(results);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [query, item_list]);

  const handleCartToggle = (id) => {
    if (cartItems[id]) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };

  const handleWishlistClick = (id) => {
    toggleWishlist(id);
  };

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      {loading ? (
        <p className="loading-msg">Loading results... ✨</p>
      ) : filteredItems.length > 0 ? (
        <div className="search-results-list">
          {filteredItems.map((item) => (
            <div key={item._id} className="search-result-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>Rs.{item.price}</p>

              <div className="action-row">
                <button
                  className={`add-to-cart-button ${cartItems[item._id] ? "added" : ""}`}
                  onClick={() => handleCartToggle(item._id)}
                >
                  {cartItems[item._id] ? "Item Added" : "Subject"}
                </button>

                <span
                  className={`wishList ${isWishlisted(item._id) ? "wishlisted" : ""}`}
                  onClick={() => handleWishlistClick(item._id)}
                >
                  {isWishlisted(item._id) ? "❤️" : "🖤"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results-msg">No items found matching your search. Try a different query!</p>
      )}
    </div>
  );
};

export default SearchResults;
