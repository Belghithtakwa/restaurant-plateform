const Category = require("../models/category.models");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ restaurant: req.restaurant._id });
    return res.status(200).json({ categories: categories });
  } catch (error) {
    res.status(500).json(error);
  }
};
const getCategoryById = async (req, res) => {
  const category = req.category;
  try {
    return res.status(200).json({ category: category });
  } catch (error) {
    return res.status(500).json(error);
  }
};
const createCategory = async (req, res) => {
  const restaurant = req.restaurant;
  const newCategory = new Category({
    categoryName: req.body.categoryName,
    description: req.body.description,
    restaurant: restaurant._id,
  });
  try {
    const savedCategory = await newCategory.save();
    return res.status(200).json({ category: savedCategory });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const deleteCategory = async (req, res) => {
  const category = req.category;
  try {
    const deletedCategory = await Category.findByIdAndDelete(category._id);
    return res.status(200).json({ category: deletedCategory });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateCategory = async (req, res) => {
  const category = req.category;
  const { ...dataToUpdate } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      category._id,
      dataToUpdate,
      {
        new: true,
      }
    );
    if (dataToUpdate.categoryName) {
      await updatedCategory.slugify();
      await updatedCategory.save();
    }
    return res.status(200).json({ updatedCategory: updatedCategory });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.updateCategory = updateCategory;
module.exports.createCategory = createCategory;
module.exports.deleteCategory = deleteCategory;
module.exports.getCategoryById = getCategoryById;
module.exports.getCategories = getCategories;
