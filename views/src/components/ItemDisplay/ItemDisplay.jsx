import React, { useContext } from "react";
import "./ItemDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import StatItem from "../StatItem/StatItem";

const ItemDisplay = ({ category }) => {
  const { item_list } = useContext(StoreContext);

  if (!item_list || item_list.length === 0) {
    return <p className="loading-msg">Loading kawaii goodies... ✨</p>;
  }

  // Group items by category
  const groupedItems = item_list.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // Select items to show
  let displayItems = [];

  // if (category === 'All') {
  //   // Show only New Arrivals (e.g., latest 8 items)
  //   displayItems = item_list.slice(-8); // Or filter by a `newArrival` flag if available
  // } else {
  //   displayItems = groupedItems[category] || [];
  // }
  if (category === "All") {
    // Show only items marked as new arrivals
    displayItems = item_list.filter((item) => item.newArrival);
  } else {
    displayItems = groupedItems[category] || [];
  }

  return (
    <div className="item-display" id="item-display">
      <h2>{category === "All" ? "New Arrivals" : `${category} Collection`}</h2>
      <div className="item-display-list">
        {displayItems.map((item) => (
          <StatItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};
export default ItemDisplay;

