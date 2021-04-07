const Manager = require("../models/manager.models")

const getManager = async (req,res)=>{
  try{
    const managers = await Manager.find();
    return res.status(200).json({managers : managers})
  } catch (err){
    return res.status(500).json(err)
  }
}
const deleteManager = async(req,res)=>{
  const id = req.params.managerId;
  try{
    const deletedManager = await Manager.fineOneAndDelete(id);
    return res.status(200).json({deletedManager : deletedManager})
  } catch (err){
    return res.status(500).json(err);
  }
}
const updateManager = async (req,res)=>{
  const id = req.params.managerId;
  try {
    const updatedManager = await Manager.findOneAndUpdate(id);
    return res.status(200).json({updatedManager: updatedManager})

  } catch(err) {
    return res.status(500).json(err)
  }
}
module.exports.getManager = getManager
module.exports.deleteManager = deleteManager
module.exports.updateManager = updateManager 