const router = require("express").Router();
const Admin = require("../models/admin.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isEmail = require("validator/lib/isEmail");
router.post("/register", async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (admin) return res.status(422).json("email already exist");
  try {
    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newAdmin = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedAdmin = await newAdmin.save();
    return res.status(201).json({ user: savedAdmin });
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.post("/login", async (req, res) => {
  let admin = null;
  if (isEmail(req.body.loginInfo)) {
    admin = await Admin.findOne({ email: req.body.loginInfo });
    if (!admin) return res.status(400).json("email/password wrong");
  }

  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass) return res.status(404).json("email/password wrong");
  const token = jwt.sign(
    {
      _id: admin._id,
      isActive: admin.isActive,
      isManager: admin.isManager,
      isAdmin: admin.isAdmin,
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "2 days" }
  );
  return res
    .status(200)
    .header({ access_token: token })
    .json({ token: token, user: admin });
});
module.exports = router;
