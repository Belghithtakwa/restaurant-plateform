const router = require("express").Router();
const clientControllers = require("../controllers/client.controllers");
const Client = require("../models/client.models");

router.param("client", async (req, res, next, id) => {
  try {
    const client = await Client.findById(id);
    if (!client) return res.status(404).json("not found");
    req.client = client;
    return next();
  } catch (err) {
    res.status(500).json(err);
  }
});
//route admin
router.get("/admin", clientControllers.getClients);
router.get("/admin/:client", clientControllers.getClient);
router.put(
  "/admin/:client",
  verifyToken,
  isActive,
  isAdmin,
  clientControllers.updateClient
);
router.delete(
  "/admin/:client",
  verifyToken,
  isActive,
  isAdmin,
  clientControllers.deleteClient
);

router.get("/me", verifyToken, isActive, clientControllers.getOwnedClientById);
router.put("/me", verifyToken, isActive, clientControllers.updateClient);
router.delete("/me", verifyToken, isActive, clientControllers.deleteClient);

module.exports = router;
