module.exports = (req, res, next) => {
  if (!req.verifiedUser.isActive) {
    return res
      .status(403)
      .json("you are not active user, please activate your account");
  } else {
      next()
  }
};
