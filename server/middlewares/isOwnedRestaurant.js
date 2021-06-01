module.exports = function (req, res, next) {
  const userId = req.verifiedUser._id;
  const restaurant = req.restaurant;

  if (restaurant.owners.indexOf(userId) !== -1) {
    next();
  } else {
    return res.status(403).json({ message: "forbidden access" });
  }
};
