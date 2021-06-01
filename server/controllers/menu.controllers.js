const Menu = require("../models/menu.models");
const Restaurant = require("../models/restaurant.models");
const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    return res.status(200).json({ menus: menus });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getMenuById = async (req, res) => {
  const menu = req.menu;
  try {
    return res.status(200).json({ menu: menu });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const createMenu = async (req, res) => {
  const restaurant = req.restaurant;
  const newMenu = new Menu({
    menuName: req.body.menuName,
    description: req.body.description,
    categories: req.body.categories,
    restaurant: restaurant._id,
  });

  try {
    const savedMenu = await newMenu.save();
    await Restaurant.findByIdAndUpdate(
      restaurant._id,
      {
        $push: { menus: savedMenu._id },
      },
      { new: true }
    );
    return res.status(200).json({ savedMenu: savedMenu });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const updateMenu = async (req, res) => {
  const menuId = req.params.menuId;

  try {
    const data = req.body;
    const { ...dataToUpdate } = data;
    const updatedMenu = await Menu.findByIdAndUpdate(menuId, dataToUpdate, {
      new: true,
    });
    return res.status(500).json({ updatedMenu: updatedMenu });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteMenu = async (req, res) => {
  const menuId = req.params.menuId;

  try {
    const deletedMenu = await Menu.findByIdAndDelete(menuId);
    return res.status(200).json({ deletedMenu: deletedMenu });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.createMenu = createMenu;
module.exports.getMenus = getMenus;
module.exports.updateMenu = updateMenu;
module.exports.deleteMenu = deleteMenu;
module.exports.getMenuById = getMenuById;
