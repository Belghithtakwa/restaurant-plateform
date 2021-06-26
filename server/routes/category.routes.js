const router = require("express").Router();
const categoryControllers = require("../controllers/category.controllers");
const Category = require("../models/category.models");
const Restaurant = require("../models/restaurant.models");
const isOwnedRestaurant = require('../middlewares/isOwnedRestaurant')
const isManager = require("../middlewares/isManager");
const isActive = require("../middlewares/isActive");
const verifyToken = require("../middlewares/verifyToken");
router.param("category", async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);
    if (!category) return res.status(404).json("category not found");
    req.category = category;
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
router.get("/:restaurant/:category", categoryControllers.getCategoryById);
router.get("/:restaurant", categoryControllers.getCategories);
router.post(
  "/:restaurant",
  verifyToken,
  isActive,
  isManager,
  categoryControllers.createCategory
);
router.put(
  "/:restaurant/:category",
  verifyToken,
  isActive,
  isManager,
 isOwnedRestaurant,
  categoryControllers.updateCategory
);
router.delete(
  "/:restaurant/:category",
  verifyToken,
  isActive,
  isManager,
 isOwnedRestaurant,
  categoryControllers.deleteCategory
);

module.exports = router;
