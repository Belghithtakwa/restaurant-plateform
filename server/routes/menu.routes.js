const router = require("express").Router();
const menuControllers = require("../controllers/menu.controllers");
const Menu = require("../models/menu.models");
const Restaurant = require("../models/restaurant.models");
const isManager = require("../middlewares/isManager");
const isActive = require("../middlewares/isActive");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const isOwnedRestaurant = require("../middlewares/isOwnedRestaurant");
router.param("menu", async (req, res, next, id) => {
  try {
    const menu = await Menu.findById(id)
      .populate({
        path: "restaurant",
        select: "restaurantName",
      })
      .populate({ path: "categories" });
    if (!menu) return res.status(404).json("menu not found");
    req.menu = menu;
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
router.get("/admin", verifyToken, isActive, isAdmin, menuControllers.getMenus);
router.get(
  "/admin/:menu",
  verifyToken,
  isActive,
  isAdmin,
  menuControllers.getMenuById
);
router.delete(
  "/admin/:menu",
  verifyToken,
  isActive,
  isAdmin,
  menuControllers.deleteMenu
);
//manager routes
router.get(
  "/:restaurant",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  menuControllers.getMenus
);
router.get("/:restaurant/:menu", menuControllers.getMenuById);
router.post(
  "/:restaurant",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  menuControllers.createMenu
);
router.put(
  "/:restaurant/:menu",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  menuControllers.updateMenu
);
router.delete(
  "/:restaurant/:menu",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  menuControllers.deleteMenu
);
module.exports = router;
