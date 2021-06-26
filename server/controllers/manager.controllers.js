const Manager = require("../models/manager.models");

const getManagers = async (req, res) => {
  try {
    const managers = await Manager.find();
    return res.status(200).json({ managers: managers });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getOwnManagerData = async (req, res) => {
  const managerId = req.verifiedUser._id;
  try {
    const manager = await Manager.findById(managerId);
    return res.status(200).json({ manager: manager });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getManagerById = async (req, res) => {
  const managerId = req.params.managerId;
  try {
    const manager = await Manager.findById(managerId);
    return res.status(200).json({ manager: manager });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const createManager = async (req, res) => {
  const newManager = new Manager({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
    password: req.body.password,
  });
  try {
    const savedManager = await newManager.save();
    return res.status(200).json({ savedManager: savedManager });
  } catch (error) {
    return res.status(500).json(err);
  }
};
const deleteManager = async (req, res) => {
  const managerId = req.params.managerId;

  try {
    const deletedManager = await Manager.findByIdAndDelete(managerId);
    return res.status(200).json({ deletedManager: deletedManager });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const updateManager = async (req, res) => {
  const managerId = req.params.managerId;

  try {
    const data = req.body;
    const { ...dataToUpdate } = data;
    const updatedManager = await Manager.findByIdAndUpdate(
      managerId,
      dataToUpdate,
      { new: true }
    );
    return res.status(200).json({ updatedManager: updatedManager });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.deleteManager = deleteManager;
module.exports.updateManager = updateManager;
module.exports.getManagers = getManagers;
module.exports.getManagerById = getManagerById;
module.exports.createManager = createManager;
module.exports.getOwnManagerData = getOwnManagerData;
