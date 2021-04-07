const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.header("access_token");
  if (!token) {
    return res.status(401).json("no token provided");
  }
  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.verifiedUser = verified;
    next();
  } catch (err) {
    return res.status(400).json(err);
  }
};
