const Address = require("../models/address.models");

const getAddressById = async (req, res) => {
  const address = req.address;
  try {
    return res.status(200).json({ address: address });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const createAddress = async (req, res) => {
  const newAddress = new Address({
    streetName: req.body.streetName,
    codeZip: req.body.codeZip,
    blockNumber: req.body.blockNumber,
  });
  try {
    const savedAddress = await newAddress.save();
    return res.status(200).json({ savedAddress: savedAddress });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const updateAddress = async (req, res) => {
  const address = req.address;
  try {
    const data = req.body;
    const { ...dataToUpdate } = data;
    const updatedAddress = await Address.findByIdAndUpdate(
      address._id,
      dataToUpdate,
      { new: true }
    );
    return res.status(500).json({ updatedAddress: updatedAddress });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const deleteAddress = async (req, res) => {
  const address = req.address;

  try {
    const deletedAddress = await Address.findByIdAndDelete(address._id);
    return res.status(200).json({ deletedAddress: deletedAddress });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.updateAddress = updateAddress;
module.exports.createAddress = createAddress;
module.exports.deleteAddress = deleteAddress;
module.exports.getAddressById = getAddressById;
