const Feedback = require("../models/feedback.models");

const getFeedbackById = async(req, res)=>{
  const feedback = req.feedback
  try {
    return res.status(200).json({feedback: feedback}) 
  } catch (err) {
    return res.status(500).json(err)
  }
}
const getOwnedFeedbacks = async(req, res)=>{
  const clientId = req.verifiedUser._id
  try {
    const feedback = await Feedback.find({client: clientId})
    return res.status(200).json({feedback: feedback}) 
  } catch (err) {
    return res.status(500).json(err)
  }
}
const getFeedbacks = async(req, res)=>{
  try {
    const feedbacks = await Feedback.find()
    return res.status(200).json({feedbacks: feedbacks}) 
  } catch (err) {
    return res.status(500).json(err)
  }
}

const createFeedback = async(req, res) => {

  const newFeedback = new Feedback({
    client : req.body.client,
    description : req.body.description,
  });
  try {
    const savedFeedback = await newFeedback.save();
    return res.status(200).json({savedFeedback : savedFeedback});
  } catch (err){
    return res.status(500).json(err)
  };
};
const updateFeedback = async (req, res)=>{
 const feedback = req.feedback;
 try {
  const data = req.body;
  const {...dataToUpdate} = data;
  const updatedfeedback = await Feedback.findByIdAndUpdate(feedback._id,dataToUpdate, {new : true});
  return res.status(200).json({updatedfeedback : updatedfeedback});
} catch (err){
  return res.status(500).json(err);
}

};
const deleteFeedback = async (req, res) => {
  const feedback = req.feedback;

  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(feedback._id);
    return res.status(200).json({ deletedFeedback: deletedFeedback});
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.updateFeedback = updateFeedback;
module.exports.createFeedback = createFeedback;
module.exports.deleteFeedback = deleteFeedback;
module.exports.getFeedbackById = getFeedbackById;
module.exports.getFeedbacks = getFeedbacks;
module.exports.getOwnedFeedbacks = getOwnedFeedbacks;
