const router = require("express").Router();
const restaurantControllers = require("../controllers/restaurant.controllers");
const Restaurant = require("../models/restaurant.models");
const isManager = require("../middlewares/isManager");
const isActive = require("../middlewares/isActive");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const isOwnedRestaurant = require("../middlewares/isOwnedRestaurant");
const orderControllers = require("../controllers/order.controllers");
const dashboardControllers = require("../controllers/dashboard.controllers");
const Order = require("../models/order.models");
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
router.param("order", async (req, res, next, id) => {
  try {
    const order = await Order.findById(id).populate({
      path: "items.product",
      select: "productName",
    });
    if (!order) return res.status(404).json("order not found");
    req.order = order;
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
});
//admin routes
router.get(
  "/",
  verifyToken,
  isActive,
  isAdmin,
  restaurantControllers.getRestaurants
);
router.get(
  "/:restaurant",
  verifyToken,
  isActive,
  isAdmin,
  restaurantControllers.getRestaurantById
);
router.delete(
  "/:restaurant",
  verifyToken,
  isActive,
  isAdmin,
  restaurantControllers.deleteRestaurant
);
router.put(
  "/:restaurant",
  verifyToken,
  isActive,
  isAdmin,
  restaurantControllers.updateRestaurant
);
router.post(
  "/",
  verifyToken,
  isActive,
  isAdmin,
  restaurantControllers.createRestaurant
);
//manager routes

router.get(
  "/me",
  verifyToken,
  isActive,
  isManager,
  restaurantControllers.getOwnedRestaurants
);
router.get(
  "/me/:restaurant",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  restaurantControllers.getRestaurantById
);
router.put(
  "/me/:restaurant",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  restaurantControllers.updateRestaurant
);
router.delete(
  "/me/:restaurant",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  restaurantControllers.deleteRestaurant
);
router.post(
  "/",
  verifyToken,
  isActive,
  isManager,
  restaurantControllers.createOwnedRestaurant
);
// order
//manager routes
router.get(
  "/:restaurant/orders",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  orderControllers.getOrders
);
router.get(
  "/:restaurant/orders/:order",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  orderControllers.getOrderById
);
router.post(
  "/:restaurant/orders",
  verifyToken,
  isActive,
  orderControllers.createOrder
);
router.delete(
  "/:restaurant/orders/:order",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  orderControllers.deleteOrder
);
router.get(
  "/:restaurant/count_order",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  dashboardControllers.getOrderNumberByRestaurant
);
router.get(
  "/:restaurant/count_confirmed_order",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  dashboardControllers.orderConfirmationAverageNumberByRestaurant
);
module.exports = router;
