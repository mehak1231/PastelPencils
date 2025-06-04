import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Orders.css";

const Orders = () => {
  const { user, token, ordersRefreshToggle, setOrdersRefreshToggle } =
    useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.userid) return;
      try {
        const res = await fetch(
          `http://localhost:5000/api/orders/user/${user.userid}`,
          {
            headers: { token: token },
          }
        );
        const data = await res.json();
        if (data.success) setOrders(data.orders);
        else console.error(data.message);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, [user, token, ordersRefreshToggle]);

  const handleDownloadInvoice = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/download-invoice/${orderId}`,
        {
          headers: {
            token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download invoice");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Could not download invoice. Please try again.");
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          orderId,
          status: "Cancelled",
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Order cancelled successfully.");
        setOrdersRefreshToggle((prev) => !prev);
      } else {
        alert(data.message || "Failed to cancel order.");
      }
    } catch (error) {
      console.error("Cancel order error:", error);
      alert("An error occurred while cancelling the order.");
    }
  };

  return (
    <div className="orders-page">
      <h2>📦 My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Total (₹)</th>
                <th>Address</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) =>
                order.items?.map((item, idx) => (
                  <tr key={`${order.id}-${idx}`}>
                    {idx === 0 && (
                      <>
                        <td rowSpan={order.items.length}>{order.id}</td>
                        <td rowSpan={order.items.length}>{order.status}</td>
                        <td rowSpan={order.items.length}>
                          {order.totalAmount}
                        </td>
                        <td rowSpan={order.items.length}>
                          {order.address?.street}, {order.address?.city}
                        </td>
                      </>
                    )}
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price}</td>
                    {idx === 0 && (
                      <td rowSpan={order.items.length}>
                        {order.status === "Pending" && (
                          <>
                            <button
                              className="cancel-btn"
                              onClick={() => cancelOrder(order.id)}
                            >
                              Cancel
                            </button>
                            <button
                              className="download-btn"
                              onClick={() => handleDownloadInvoice(order.id)}
                            >
                              Download Invoice
                            </button>
                          </>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
