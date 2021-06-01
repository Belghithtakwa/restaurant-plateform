module.exports = (req, res, next) => {
  if (!req.verifiedUser.isAdmin) {
    return res.status(403).json("you are not a manager");
  } else {
    next();
  }
};
