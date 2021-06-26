module.exports = function (req, res, next) {
  const userId = req.verifiedUser._id;
  const order = req.order;

  if (userId === order.client.toString()) {
    next();
  } else {
    return res.status(403).json({ message: "forbidden access" });
  }
};
