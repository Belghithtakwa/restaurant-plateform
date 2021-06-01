const router = require("express").Router();
const Manager = require("../models/manager.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isEmail = require("validator/lib/isEmail");
const Address = require("../models/address.models");
const Restaurant = require("../models/restaurant.models");
router.post("/register", async (req, res) => {
  const manager = await Manager.findOne({ email: req.body.email });
  if (manager) return res.status(422).json("email already exist");
  try {
    const newAddress = new Address({
      streetName: req.body.streetName,
      codeZip: req.body.codeZip,
      blockNumber: req.body.blockNumber,
    });
    const savedAddress = await newAddress.save();

    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newManager = new Manager({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: hashedPassword,
      address: savedAddress._id,
    });
    const savedManager = await newManager.save();
    const newRestaurant = new Restaurant({
      restaurantName: req.body.restaurantName,
      owners: [newManager._id],
    });

    const savedRestaurant = await newRestaurant.save();
    savedManager.restaurants.push(savedRestaurant._id);
    await savedManager.save();
    return res.status(201).json({ user: savedManager });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  let manager = null;
  if (isEmail(req.body.loginInfo)) {
    manager = await Manager.findOne({ email: req.body.loginInfo });
    if (!manager) return res.status(400).json("email/password wrong");
  } else {
    manager = await Manager.findOne({ phoneNumber: req.body.loginInfo });
    if (!manager) return res.status(400).json("phoneNumber/password wrong");
  }

  const validPass = await bcrypt.compare(req.body.password, manager.password);
  if (!validPass) return res.status(404).json("email/password wrong");
  const token = jwt.sign(
    {
      _id: manager._id,
      isActive: manager.isActive,
      isManager: manager.isManager,
      isAdmin: manager.isAdmin
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "2 days" }
  );
  return res
    .status(200)
    .header({ access_token: token })
    .json({ token: token, user: manager });
});
module.exports = router;
