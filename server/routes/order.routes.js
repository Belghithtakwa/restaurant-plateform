const router = require("express").Router();
const orderControllers = require("../controllers/order.controllers");
const Order = require("../models/order.models");
const Restaurant = require("../models/restaurant.models");
const isManager = require("../middlewares/isManager");
const isActive = require("../middlewares/isActive");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const isOwnedRestaurant = require("../middlewares/isOwnedRestaurant");
const isOwnedOrder = require("../middlewares/isOwnedOrder");
router.param("order", async (req, res, next, id) => {
  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json("order not found");
    req.order = order;
    return next();
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.param("restaurant", async (req, res, next, id) => {
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) return res.status(404).json("restaurant not found");
    req.restaurant = restaurant;
    return next();
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.param("order", async (req, res, next, id) => {
  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json("order not found");
    req.order = order;
    return next();
  } catch (err) {
    return res.status(500).json(err);
  }
});
//admin routes
router.get("/admin/", verifyToken, isActive, isAdmin, orderControllers.getOrders);
router.get(
  "/admin/:order",
  verifyToken,
  isActive,
  isAdmin,
  orderControllers.getOrderById
);
router.delete(
  "/admin/:order",
  verifyToken,
  isActive,
  isAdmin,
  orderControllers.deleteOrder
);
//manager routes
router.get(
  "/:restaurant",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  orderControllers.getOrders
);
router.get(
  "/:restaurant/:order",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  orderControllers.getOrderById
);
router.post(
  "/:restaurant",
  verifyToken,
  isActive,
  orderControllers.createOrder
);
router.delete(
  "/:restaurant",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  orderControllers.deleteOrder
);

router.get("/", verifyToken, isActive, orderControllers.getOwnedOrders);
router.get(
  "/:order",
  verifyToken,
  isActive,
  isOwnedOrder,
  orderControllers.getOwnedOrder
);
//Client routes
router.post("/client", verifyToken, isActive, orderControllers.createOrder);
router.put(
  "/client/:order",
  verifyToken,
  isActive,
  isOwnedOrder,
  orderControllers.addToClientOrder
);
module.exports = router;
