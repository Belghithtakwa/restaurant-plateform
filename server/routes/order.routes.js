const router = require("express").Router();
const orderControllers = require("../controllers/order.controllers");
const Order = require("../models/order.models");
const Restaurant = require("../models/restaurant.models");
const isManager = require("../middlewares/isManager");
const isActive = require("../middlewares/isActive");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const isOwnedOrder = require("../middlewares/isOwnedOrder");
router.param("order", async (req, res, next, id) => {
  try {
    const order = await Order.findById(id).populate({
      path: "items.product",
      select: "productName",
    });
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
//admin routes
router.get(
  "/admin/",
  verifyToken,
  isActive,
  isAdmin,
  orderControllers.getOrders
);
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

router.get("/", verifyToken, isActive, orderControllers.getOwnedOrders);
router.get(
  "/client/:order",
  verifyToken,
  isActive,
  isOwnedOrder,
  orderControllers.getOwnedOrder
);
router.get("/client/:orderCode/bycode", orderControllers.getOwnedOrderByCode);
//Client routes
router.post(
  "/:restaurant/client",
  verifyToken,
  isActive,
  orderControllers.createOrder
);
router.put(
  "/:restaurant/client/:order",
  verifyToken,
  isActive,
  isOwnedOrder,
  orderControllers.addToClientOrder
);
router.put(
  "/client/:order/checkout",
  verifyToken,
  isActive,
  isOwnedOrder,
  orderControllers.orderCheckout
);
router.get(
  "/:order/confirm",
  verifyToken,
  isActive,
  isManager,
  orderControllers.confirmOrder
);
router.get(
  "/:order/cancel",
  verifyToken,
  isActive,
  isManager,
  orderControllers.cancelOrder
);
router.get("/:order/client/pay", orderControllers.payOrderWithStripe);
module.exports = router;
