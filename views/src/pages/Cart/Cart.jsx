import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    item_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    setCartItems
  } = useContext(StoreContext);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  const navigate = useNavigate(); // Initialize navigate

  const displayItems = item_list.filter(item => cartItems[item._id]);
  const totalCart = getTotalCartAmount();
  const totalPayable = Math.max(totalCart - discount, 0);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'KAWAII10') {
      const discountAmount = totalCart * 0.1;
      setDiscount(discountAmount);
      setPromoMessage('🎉 Promo applied! 10% discount.');
    } else {
      setDiscount(0);
      setPromoMessage('❌ Invalid promo code.');
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {displayItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty!</p>
      ) : (
        <>
          {/* Desktop View */}
          <div className="cart-table-wrapper">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {displayItems.map(item => {
                  const qty = cartItems[item._id];
                  const itemTotal = item.price * qty;
                  const itemShare = totalCart > 0 ? itemTotal / totalCart : 0;
                  const itemDiscount = itemShare * discount;
                  const finalItemTotal = itemTotal - itemDiscount;

                  return (
                    <tr key={item._id}>
                      <td><img src={item.image} alt={item.name} className="cart-img" /></td>
                      <td>{item.name}</td>
                      <td>₹{item.price}</td>
                      <td className="inc">
                        <button onClick={() => removeFromCart(item._id)}>-</button>
                        <span className="qty-count">{qty}</span>
                        <button onClick={() => addToCart(item._id)}>+</button>
                      </td>
                      <td>
                        ₹{finalItemTotal.toFixed(2)}{' '}
                        {discount > 0 && (
                          <span className="original-price"> (₹{itemTotal.toFixed(2)})</span>
                        )}
                      </td>
                      <td>
                        <button className="remove-cross" onClick={() => removeFromCart(item._id)}>×</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="cart-mobile">
            {displayItems.map(item => {
              const qty = cartItems[item._id];
              const itemTotal = item.price * qty;
              const itemShare = totalCart > 0 ? itemTotal / totalCart : 0;
              const itemDiscount = itemShare * discount;
              const finalItemTotal = itemTotal - itemDiscount;

              return (
                <div className="cart-mobile-item" key={item._id}>
                  <img src={item.image} className="cart-img" />
                  <div className="mobile-details">
                    <p><strong>{item.name}</strong></p>
                    <p>Price: ₹{item.price}</p>
                    <p>
                      Qty:
                      <span className="inc">
                        <button onClick={() => removeFromCart(item._id)}>-</button>
                        <span className="qty-count">{qty}</span>
                        <button onClick={() => addToCart(item._id)}>+</button>
                      </span>
                    </p>
                    <p>
                      Total: ₹{finalItemTotal.toFixed(2)}{' '}
                      {discount > 0 && (
                        <span className="original-price"> (₹{itemTotal.toFixed(2)})</span>
                      )}
                    </p>
                    <button className="remove-cross" onClick={() => removeFromCart(item._id)}>x</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Promo Section */}
          <div className="promo-section">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="promo-input"
            />
            <button onClick={handleApplyPromo} className="apply-promo-btn">Apply</button>
            {promoMessage && <p className="promo-message">{promoMessage}</p>}
          </div>

          {/* Totals */}
          <div className="cart-totals">
            <h3 className="cart-total">Subtotal: ₹{totalCart.toFixed(2)}</h3>
            {discount > 0 && <h4 className="cart-discount">Discount: -₹{discount.toFixed(2)}</h4>}
            <h3 className="cart-total">Total Payable: ₹{totalPayable.toFixed(2)}</h3>
          </div>

          {/* Checkout Button */}
          <button className="buy-now-btn" onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </>
      )}
    </div>
  );
};

export default Cart;
