import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    clearCart,
    token,
    cartItems,
    item_list,
    ordersRefreshToggle,
    setOrdersRefreshToggle,
  } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const isValid = Object.values(formData).every((val) => val.trim() !== '');
    setIsFormValid(isValid);
  }, [formData]);

  const prepareCartItemsArray = () => {
    return Object.entries(cartItems).map(([id, qty]) => {
      const item = item_list.find((i) => i._id === id);
      return {
        id,
        name: item?.name || '',
        price: item?.price || 0,
        quantity: qty,
      };
    });
  };

  const loadRazorpay = async () => {
    const subtotal = getTotalCartAmount();
    const deliveryFee = subtotal === 0 ? 0 : 2;
    const amount = subtotal + deliveryFee;

    if (amount === 0) {
      toast.error('🛒 Your cart is empty!');
      return;
    }

    const options = {
      key: 'rzp_test_BLDFxrsaI0T10G',
      amount: amount * 100,
      currency: 'INR',
      name: 'Kawaii Stationery',
      description: 'Order Payment',
      handler: async function (response) {
        toast.success(`✅ Payment Successful! Payment ID: ${response.razorpay_payment_id}`);

        try {
          await axios.post(
            'http://localhost:5000/api/orders',
            {
              totalAmount: amount,
              paymentId: response.razorpay_payment_id,
              address: formData,
              items: prepareCartItemsArray(),
            },
            {
              headers: {
                token: token,
              },
            }
          );

          toast.success('🎉 Order placed successfully!');
          clearCart();
          setOrdersRefreshToggle(!ordersRefreshToggle);
        } catch (error) {
          console.error('Order save error:', error);
          toast.error('⚠ Payment succeeded, but order could not be saved.');
        }
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: `${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`,
      },
      theme: {
        color: '#F37254',
      },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      toast.error('❌ Razorpay SDK failed to load. Please try again later.');
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} />
      <div className="place-order">
        <div className="place-order-left">
          <h2 className="title">Delivery Information</h2>
          <div className="multi-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
          />
          <div className="multi-fields">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="multi-fields">
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹2</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() + 2}</b>
            </div>
            <button
              type="button"
              onClick={loadRazorpay}
              disabled={!isFormValid}
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
