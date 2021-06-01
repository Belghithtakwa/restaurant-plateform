module.exports = function (req, res, next){
  const userId = req.verifiedUser._id
  const product = req.product
  
  if(userId === product.client){
    next()
  }else{
    return res.status(403).json({message: "forbidden access"})
  }
  }