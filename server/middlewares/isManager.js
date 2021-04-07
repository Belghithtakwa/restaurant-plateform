module.exports = (req, res, next) => {
  if (!req.verifiedUser.isManager) {
    return res.status(403).json("you are not a manager");
  } else {
    next();
  }
};
