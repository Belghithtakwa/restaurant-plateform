const Order = require("../models/order.models");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json({ orders: orders });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getOwnedOrder = async (req, res) => {
  const order = req.order;
  try {
    return res.status(200).json({ order: order });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getOwnedOrders = async (req, res) => {
  const clientId = req.verifiedUser._id;
  try {
    const orders = await Order.find({ client: clientId });
    return res.status(200).json({ orders: orders });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const createOrder = async (req, res) => {
  const newOrder = new Order({
    items: req.body.items,
    orderType: req.body.orderType,
    deliveryAddress: req.body.deliveryAddress,
    totalPrice: req.body.totalPrice,
    restaurant: restaurant._id,
    client: req.verifiedUser._id,
  });
  try {
    const savedOrder = await newOrder.save();
    return res.status(200).json({ order: savedOrder });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const addToClientOrder = async (req, res) => {
  const order = req.order;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      order._id,
      {
        $push: { items: req.body.item },
      },
      { new: true }
    );
    return res.status(200).json({ order: updatedOrder });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getOrderById = async (req, res) => {
  const order = req.order;
  try {
    return res.status(500).json({ order: order });
  } catch (err) {
    return res.status(500).json(err);
  }
};
// const updateOrder = async (req, res) => {
//   const order = req.order;

//   try {
//     const data = req.body;
//     const { ...dataToUpdate } = data;
//     const updatedOrder = await Order.findByIdAndUpdate(order._id, dataToUpdate, {
//       new: true,
//     });
//     return res.status(500).json({ updatedOrder: updatedOrder });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

const deleteOrder = async (req, res) => {
  const order = req.order;

  try {
    const deletedOrder = await Order.findByIdAndDelete(order._id);
    return res.status(200).json({ deletedOrder: deletedOrder });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// module.exports.updateOrder = updateOrder;
module.exports.createOrder = createOrder;
module.exports.deleteOrder = deleteOrder;
module.exports.getOrders = getOrders;
module.exports.getOrderById = getOrderById;
module.exports.getOwnedOrder = getOwnedOrder;
module.exports.getOwnedOrders = getOwnedOrders;
module.exports.addToClientOrder = addToClientOrder;
