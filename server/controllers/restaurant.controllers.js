const Restaurant = require("../models/restaurant.models");
const Manager = require("../models/manager.models");
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    return res.status(200).json({ restaurants: restaurants });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getOwnedRestaurants = async (req, res) => {
  const managerId = req.verifiedUser._id;
  try {
    const restaurants = await Restaurant.find({ owners: { $in: managerId } });
    return res.status(200).json({ restaurants: restaurants });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getRestaurantById = async (req, res) => {
  const restaurant = req.restaurant;
  try {
    return res.status(200).json({ restaurant: restaurant });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const updateRestaurant = async (req, res) => {
  const restaurantId = req.params.restaurantId;

  try {
    const data = req.body;
    const { ...dataToUpdate } = data;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      dataToUpdate,
      { new: true }
    );
    return res.status(200).json({ updatedRestaurant: updatedRestaurant });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteRestaurant = async (req, res) => {
  const restaurantId = req.params.restaurantId;

  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    return res.status(200).json({ deletedRestaurant: deletedRestaurant });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const createRestaurant = async (req, res) => {
  // TODO: add restaurant address check
  const newRestaurant = new Restaurant({
    restaurantName: req.body.restaurantName,
    description: req.body.description,
    owners: req.body.owners,
    canDeliver: req.body.canDeliver,
  });
  try {
    const savedRestaurant = await newRestaurant.save();
    savedRestaurant.owners.forEach(async (owner) => {
      const currentOwner = await Manager.findById(owner);
      currentOwner.restaurants.push(savedRestaurant._id);
      await currentOwner.save();
    });
    return res.status(201).json({ savedRestaurant: savedRestaurant });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const createOwnedRestaurant = async (req, res) => {
  
  const owners = [...req.body.owner, req.verifiedUser._id];
  const newRestaurant = new Restaurant({
    restaurantName: req.body.restaurantName,
    description: req.body.description,
    owners: owners,
    canDeliver: req.body.canDeliver,
  });
  try {
    const savedRestaurant = await newRestaurant.save();
    savedRestaurant.owners.forEach(async (owner) => {
      const currentOwner = await Manager.findById(owner);
      currentOwner.restaurants.push(savedRestaurant._id);
      await currentOwner.save();
    });
    return res.status(201).json({ savedRestaurant: savedRestaurant });
  } catch (err) {
    return res.status(500).json(err);
  }
};
module.exports.getRestaurants = getRestaurants;
module.exports.getRestaurantById = getRestaurantById;
module.exports.getOwnedRestaurants = getOwnedRestaurants;
module.exports.createRestaurant = createRestaurant;
module.exports.createOwnedRestaurant = createOwnedRestaurant;
module.exports.deleteRestaurant = deleteRestaurant;
module.exports.updateRestaurant = updateRestaurant;
