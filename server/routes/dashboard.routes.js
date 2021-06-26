const router = require("express").Router();
const isActive = require("../middlewares/isActive");
const isManager = require("../middlewares/isManager");
const isOwnedRestaurant = require("../middlewares/isOwnedRestaurant");
const dashboardControllers = require("../controllers/dashboard.controllers");
const verifyToken = require("../middlewares/verifyToken");
const Restaurant = require("../models/restaurant.models");
router.param("restaurant", async (req, res, next, id) => {
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) return res.status(404).json("restaurant not found");
    req.restaurant = restaurant;
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.get(
  "/:restaurant/order_number",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  dashboardControllers.getOrderNumberByRestaurant
);
router.get(
  "/:restaurant/order_confirmation_average",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  dashboardControllers.orderConfirmationAverageNumberByRestaurant
);

module.exports = router;
