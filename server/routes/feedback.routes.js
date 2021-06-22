const router = require("express").Router()
const feedbackControllers = require('../controllers/feedback.controllers')
const isActive = require('../middlewares/isActive')
const isAdmin = require('../middlewares/isAdmin')
const verifyToken = require('../middlewares/verifyToken')
const FeedBack = require('../models/feedback.models')
const isOwnedFeeBack = require('../middlewares/isOwnedFeedBack')
router.param('feedback', async(req, res,next, id)=>{
  try {
    const feedback = await FeedBack.findById(id)
    if(!feedback) return res.status(404).json('not found')
    req.feedback = feedback
    return next()
  } catch (err) {
    return res.status(500).json(err)
  }
})
//admin route
router.get('/admin/', feedbackControllers.getFeedbacks)
router.put('/admin/:feedback',verifyToken, isActive, isAdmin, feedbackControllers.updateFeedback)
router.delete('/admin/:feedback', verifyToken, isActive, isAdmin, feedbackControllers.deleteFeedback)


router.get('/me',verifyToken, isActive, feedbackControllers.getOwnedFeedbacks)
router.post('/',verifyToken, feedbackControllers.createFeedback)
router.put('/:feedback',verifyToken, isActive, isOwnedFeeBack, feedbackControllers.updateFeedback)
router.delete('/:feedback', verifyToken, isActive, isOwnedFeeBack, feedbackControllers.deleteFeedback)
router.get("/:feedback",verifyToken, isActive, feedbackControllers.getFeedbackById )

module.exports = router
