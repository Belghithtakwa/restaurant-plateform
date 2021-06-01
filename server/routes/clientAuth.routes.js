const router = require("express").Router();
const Client = require("../models/client.models");
const Address = require("../models/address.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isEmail = require("validator/lib/isEmail");

router.post("/register", async (req, res) => {
  const client = await Client.findOne({ email: req.body.email });
  if (client) return res.statusCode(422).json("email already exist");
  try {
    const newAddress = new Address({
      streetName: req.body.streetName,
      codeZip: req.body.codeZip,
      blockNumber: req.body.blockNumber,
    });
    const savedAddress = await newAddress.save();
    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newClient = new Client({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      address: savedAddress._id,
      phoneNumber: req.body.phoneNumber,
    });

    const savedClient = await newClient.save();
    return res.status(201).json({ user: savedClient });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  let client = null;
  if (isEmail(req.body.loginInfo)) {
    client = await Client.findOne({ email: req.body.loginInfo });
    if (!client) return res.status(400).json("email/password wrong");
  } else {
    client = await Client.findOne({ phoneNumber: req.body.loginInfo });
    if (!client) return res.status(400).json("phoneNumber/password wrong");
  }

  const validPass = await bcrypt.compare(req.body.password, client.password);
  if (!validPass) return res.status(404).json("email/password wrong");
  const token = jwt.sign(
    {
      _id: client._id,
      isActive: client.isActive,
      isManager: client.isManager,
      isAdmin: client.idAdmin,
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "2 days" }
  );
  return res
    .status(200)
    .header({ access_token: token })
    .json({ token: token, user: client });
});
module.exports = router;
