import React, { useState, useEffect, useContext } from "react";
import "./Shop.css";
import StatItem from "../../components/StatItem/StatItem";
import { StoreContext } from "../../context/StoreContext";
import { FaFilter } from "react-icons/fa";

const Shop = () => {
  const { url } = useContext(StoreContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [maxPrice, setMaxPrice] = useState(5000);

  
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${url}/api/products/get`);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.price <= maxPrice
  );

  return (
    <div className="shop">
      <h1>Shop Our Products</h1>

      <div className="filter-toggle" onClick={() => setShowFilter(!showFilter)}>
        <FaFilter />
        
      </div>

      {showFilter && (
        <div className="price-filter-card">
          <p>Price</p>
          <input
            type="range"
            min="0"
            max="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <div className="price-range-label">
            ₹0 - ₹{maxPrice}
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length > 0 ? (
        <div className="shop-grid">
          {filteredProducts.map((product) => (
            <StatItem
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              image={`${url}/uploads/${product.image}`}
            />
          ))}
        </div>
      ) : (
        <p>No products available in this price range.</p>
      )}
    </div>
  );
};

export default Shop;