const Client = require(".../models/client.controllers.js")

const getClient = async (req,res)=>{
  try {
    const clients = await Client.find();
    return res.status(200).json({clients : clients})
  } catch (err) {
    return res.status(500).json(err)
  }
}
const deleteClient = async(req,res)=>{
  const id = req.params.clientId;
  try {
    const deletedClient = await Client.fineOneAndDelete(id);
    return res.status(200).json({deletedClient : deletedClient})
  } catch (err) {
    return res.status(500).json(err);
  }
}
const updateClient = async (req,res)=>{
  const id = req.params.clientId;
  try {
    const updatedClient = await Client.findOneAndUpdate(id);
    return res.status(200).json({updatedClient: updatedClient})
  } catch (err) {
    return res.status(500).json(err)
  }
}
module.exports.getClient = getClient
module.exports.deleteClient = deleteClient
module.exports.updateClient= updateClient

