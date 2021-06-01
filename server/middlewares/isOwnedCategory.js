module.exports = function (req, res, next){
  const userId = req.verifiedUser._id
  const category = req.category
  
  if(userId === category.client){
    next()
  }else{
    return res.status(403).json({message: "forbidden access"})
  }
  }