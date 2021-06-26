const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const Manager = require("../models/manager.models");
const Client = require("../models/client.models");
const isActive = require("../middlewares/isActive");
router.get("/authcheck", verifyToken, isActive, async (req, res) => {
  try {
    const manager = await Manager.findById(req.verifiedUser._id);
    const client = await Client.findById(req.verifiedUser._id);
    if (manager) {
      return res.status(200).json(manager);
    } else {
      return res.status(200).json(client);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
module.exports = router;
