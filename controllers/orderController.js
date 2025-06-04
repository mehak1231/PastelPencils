// const Order = require("../models/order");
// const User = require("../models/user");

// const getAllOrders = async (req, res) => {
//     try {
//       const orders = await Order.findAll({
//         include: {
//           model: User,
//           attributes: ["username", "email"],
//         },
//       });
//       res.status(200).json(orders);
//     } catch (err) {
//       console.error("Error fetching orders:", err); // Log the actual error
//       res.status(500).json({ error: "Failed to fetch orders" });
//     }
//   };

//   const createOrder = async (req, res) => {
//     try {
//       const { totalAmount, paymentId, address, items } = req.body;
  
//       const newOrder = await Order.create({
//         totalAmount,
//         paymentId,
//         address,
//         items, // Ensure this field exists in the Order model
//         userId: req.user.id, // Ensure `userId` is being passed correctly
//       });
//       console.log("Order data received:", req.body);
//       res.status(201).json({ success: true, data: newOrder });
//     } catch (error) {
//       console.error("Error creating order:", error);
//       res.status(500).json({ success: false, message: "Failed to create order" });
//     }
//   };

// const updateOrderStatus = async (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;
//     try {
//       const order = await Order.findByPk(id);
//       if (!order) return res.status(404).json({ error: "Order not found" });
//       order.status = status;
//       await order.save();
//       res.status(200).json(order);
//     } catch (err) {
//       res.status(500).json({ error: "Failed to update order" });
//     }
//   };


//   module.exports = {getAllOrders, createOrder, updateOrderStatus};


const Order = require("../models/order");
const User = require("../models/user");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: User,
        attributes: ["username", "email"],
      },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};


const createOrder = async (req, res) => {
  try {
    const { totalAmount, paymentId, address, items } = req.body;

    const newOrder = await Order.create({
      totalAmount,
      paymentId: paymentId || null,
      address: address || null,
      items: items || null,
      userId: req.user.id,
    });

    console.log("Order data received:", req.body);
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.status = status;
    await order.save();
    res.status(200).json({ success: true, message: "Order status updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update order" });
  }
};


const getUserOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const orders = await Order.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

module.exports = { getAllOrders, createOrder, updateOrderStatus , getUserOrdersByUserId};
