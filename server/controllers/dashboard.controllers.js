const Order = require("../models/order.models");

const getOrderNumberByRestaurant = async (req, res) => {
  try {
    const orderCount = await Order.count({ restaurant: req.restaurant._id });
    return res.status(200).json({ orderCount: orderCount });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const orderConfirmationAverageNumberByRestaurant = async (req, res) => {
  try {
    const orderCount = await Order.count({ restaurant: req.restaurant._id });
    const orderConfirmedCount = await Order.count({
      restaurant: req.restaurant._id,
      state: "confirmed",
    });
    const orderConfirmedPercent = (orderConfirmedCount / orderCount) * 100;
    return res.status(200).json({
      orderConfirmedCount: orderConfirmedCount,
      orderConfirmedPercent: orderConfirmedPercent,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.getOrderNumberByRestaurant = getOrderNumberByRestaurant;
module.exports.orderConfirmationAverageNumberByRestaurant =
  orderConfirmationAverageNumberByRestaurant;
