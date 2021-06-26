const router = require("express").Router();
const productControllers = require("../controllers/product.controllers");
const Product = require("../models/product.models");
const Restaurant = require("../models/restaurant.models");
const isOwnedRestaurant = require("../middlewares/isOwnedRestaurant");
const isManager = require("../middlewares/isManager");
const isActive = require("../middlewares/isActive");
const verifyToken = require("../middlewares/verifyToken");

//add params restaurant
router.param("product", async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json("product not found");
    req.product = product;
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

router.get("/:restaurant", productControllers.getProducts);
router.get("/:restaurant/:product", productControllers.getProductById);
router.put(
  "/:restaurant/:product",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  productControllers.updateProduct
);
router.delete(
  "/:restaurant/:product",
  verifyToken,
  isActive,
  isManager,
  isOwnedRestaurant,
  productControllers.deleteProduct
);
router.post(
  "/:restaurant",
  verifyToken,
  isActive,
  isManager,
  productControllers.createProduct
);

module.exports = router;
