import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import StatItem from "../../components/StatItem/StatItem";
import "./Wishlist.css";

const Wishlist = () => {
  const { item_list, wishlistItems, token } = useContext(StoreContext);

  if (!token) {
    return <p>Please sign in to view your wishlist.</p>; // Display message if not logged in
  }

  const filteredItems = item_list.filter((item) =>
    wishlistItems.includes(item._id)
  );

  return (
    <div className="wishlist-page">
      <h2 className="wishlist-title">Your Wishlist</h2>
      {filteredItems.length === 0 ? (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items">
          {filteredItems.map((item) => (
            <StatItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
