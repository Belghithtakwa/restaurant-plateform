const Message = require("../models/message.models");

const sendMessage = async (req, res) => {
  try {
    const newMessage = new Message({
      fullName: req.body.fullName,
      email: req.body.email,
      msg: req.body.msg,
    });
    const savedMessage = await newMessage.save();

    return res
      .status(200)
      .json({ message: savedMessage, host: req.get("host") });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.sendMessage = sendMessage;
