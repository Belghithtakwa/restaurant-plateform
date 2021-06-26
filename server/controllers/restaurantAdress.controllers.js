const RestaurantAddress = require("../models/restaurantAddress.models");

const getRestaurantAddressById = async (req, res) => {
  const restaurantAddress = req.restaurantAddress;
  try {
    return res.status(200).json({ restaurantAddress: restaurantAddress });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const createRestaurantAddress = async (req, res) => {
  const newRestaurantAddress = new RestaurantAddress({
    geo: req.body.geo,
    streetName: req.body.streetName,
    codeZip: req.body.codeZip,
    blockNumber: req.body.blockNumber,
  });
  try {
    const savedRestaurantAddress = await newRestaurantAddress.save();
    return res
      .status(200)
      .json({ savedRestaurantAddress: savedRestaurantAddress });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const updateRestaurantAddress = async (req, res) => {
  const restaurantAddress = req.restaurantAddress;
  try {
    const data = req.body;
    const { ...dataToUpdate } = data;
    const updatedRestaurantAddress = await RestaurantAddress.findByIdAndUpdate(
      restaurantAddress._id,
      dataToUpdate,
      { new: true }
    );
    return res
      .status(500)
      .json({ updatedRestaurantAddress: updatedRestaurantAddress });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const deleteRestaurantAddress = async (req, res) => {
  const restaurantAddress = req.restaurantAddress;

  try {
    const deletedRestaurantAddress = await RestaurantAddress.findByIdAndDelete(
      restaurantAddress._id
    );
    return res
      .status(200)
      .json({ deletedRestaurantAddress: deletedRestaurantAddress });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.updateRestaurantAddress = updateRestaurantAddress;
module.exports.createRestaurantAddress = createRestaurantAddress;
module.exports.deleteRestaurantAddress = deleteRestaurantAddress;
module.exports.getRestaurantAddressById = getRestaurantAddressById;
