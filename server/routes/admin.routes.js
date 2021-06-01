const router = require("express").Router();
const adminControllers = require("../controllers/admin.controllers");
const Admin = require("../models/admin.models");

const isAdmin = require("../middlewares/isAdmin");
const isActive = require("../middlewares/isActive");
const verifyToken = require("../middlewares/verifyToken");

router.param("admin", async (req, res, next, id) => {
  try {
    const admin = await Admin.findById(id);
    if (!admin) return res.status(404).json("admin not found");
    req.admin = admin;
    return next();
  } catch (err) {
    res.status(500).json(err);
  }
});
