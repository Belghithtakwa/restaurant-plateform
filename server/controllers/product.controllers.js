const Product = require("../models/product.models");

const getProductById = async (req, res) => {
  const product = req.product;
  try {
    return res.status(200).json({ product: product });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getProducts = async (req, res) => {
  const categoryQuery = req.query.category;
  if (categoryQuery) {
    try {
      const products = await Product.find({ category: categoryQuery }).populate(
        "category"
      );
      return res.status(200).json({ products: products });
    } catch (err) {
      return res.status(500).json(err);
    } 
  } else {
    try {
      const products = await Product.find({restaurant: req.restaurant._id}).populate({
        path: "category",
        select: "categoryName",
      });
      return res.status(200).json({ products: products });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
};

const createProduct = async (req, res) => {
  const restaurant = req.restaurant;

  const newProduct = new Product({
    productName: req.body.productName,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    restaurant: restaurant._id,
    price: req.body.price,
  });
  try {
    const savedProduct = await newProduct.save();
    return res.status(200).json({ savedProduct: savedProduct });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const updateProduct = async (req, res) => {
  const product = req.product;
  try {
    const data = req.body;
    const { ...dataToUpdate } = data;
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      dataToUpdate,
      { new: true }
    );
    return res.status(200).json({ updatedProduct: updatedProduct });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const deleteProduct = async (req, res) => {
  const product = req.product;

  try {
    const deletedProduct = await Product.findByIdAndDelete(product._id);
    return res.status(200).json({ deletedProduct: deletedProduct });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.updateProduct = updateProduct;
module.exports.createProduct = createProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.getProductById = getProductById;
module.exports.getProducts = getProducts;
