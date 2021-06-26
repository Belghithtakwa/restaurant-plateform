const Client = require("../models/client.models");

const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    return res.status(200).json({ clients: clients });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getOwnedClientData = async (req, res) => {
  const clientId = req.verifiedUser._id;
  try {
    const client = await Client.findById(clientId);
    return res.status(200).json({ client: client });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getClientById = async (req, res) => {
  const clientId = req.verifiedUser._id;
  try {
    const client = await Client.findById(clientId);
    return res.status(200).json({ client: client });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getClient = async (req, res) => {
  const client = req.client;
  try {
    return res.status(200).json({ client: client });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const createClient = async (req, res) => {
  const newClient = new Client({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
    password: req.body.password,
  });
  try {
    const savedClient = await newClient.save();
    return res.status(200).json({ savedClient: savedClient });
  } catch (error) {
    return res.status(500).json(err);
  }
};
const deleteClient = async (req, res) => {
  const clientId = req.verifiedUser._id;

  try {
    const deletedClient = await Client.findByIdAndDelete(clientId);
    return res.status(200).json({ deletedClient: deletedClient });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const updateClient = async (req, res) => {
  const clientId = req.verifiedUser._id;

  try {
    const data = req.body;
    const { ...dataToUpdate } = data;
    const updatedClient = await Client.findByIdAndUpdate(
      clientId,
      dataToUpdate,
      { new: true }
    );
    return res.status(200).json({ updatedClient: updatedClient });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.deleteClient = deleteClient;
module.exports.updateClient = updateClient;
module.exports.getClients = getClients;
module.exports.getClientById = getClientById;
module.exports.createClient = createClient;
module.exports.getOwnedClientById = getOwnedClientData;
module.exports.getClient = getClient;
