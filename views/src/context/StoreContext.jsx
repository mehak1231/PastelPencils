import React, { createContext, useState, useEffect } from 'react';
import { item_list } from '../images/images';

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlistItems");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [ordersRefreshToggle, setOrdersRefreshToggle] = useState(false);

  const clearCart = () => {
    setCartItems({});
  };

  const url = "http://localhost:5000";

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    token ? localStorage.setItem("token", token) : localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    user ? localStorage.setItem("user", JSON.stringify(user)) : localStorage.removeItem("user");
  }, [user]);

  const addToCart = (id) => {
   
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  console.log(cartItems)

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[id] > 1) {
        updatedCart[id] -= 1;
      } else {
        delete updatedCart[id];
      }
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const item = item_list.find((item) => item._id === itemId);
      return item ? total + item.price * cartItems[itemId] : total;
    }, 0);
  };

  const toggleWishlist = (id) => {
    setWishlistItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isWishlisted = (id) => wishlistItems.includes(id);

  return (
    <StoreContext.Provider
      value={{
        item_list,
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        toggleWishlist,
        isWishlisted,
        getTotalCartAmount,
        setCartItems,
        token,
        setToken,
        user,
        setUser,
        url,
        clearCart,
        ordersRefreshToggle,       
        setOrdersRefreshToggle,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;