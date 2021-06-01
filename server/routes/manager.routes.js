const router = require("express").Router()
const managerControllers = require('../controllers/manager.controllers')
const Manager = require('../models/manager.models')

const isManager = require("../middlewares/isManager")
const isActive = require("../middlewares/isActive")
const verifyToken = require("../middlewares/verifyToken")

router.param('manager', async(req, res,next, id)=>{
  try {
    const manager = await Manager.findById(id)
    if(!manager) return res.status(404).json('not found')
    req.manager = manager
    return next()
  } catch (err) {
    res.status(500).json(err)
  }
})
//route Admin
router.get('/admin/', managerControllers.getManagers)
router.put('/admin/:manager',verifyToken, isActive, isAdmin, managerControllers.updateManager)
router.delete('/admin/:manager', verifyToken, isActive, isAdmin, managerControllers.deleteManager)

router.get("/managers", verifyToken,isManager, managerControllers.getOwnedManagers)
router.get('/manager/id', verifyToken,isManager, managerControllers.getManagerById)
router.post("/createManager", verifyToken,isManager, managerControllers.createManager)
router.put("/udpateManager",verifyToken,isManager, managerControllers.updateManager)
router.delete('/deleteManager',verifyToken,isManager, managerControllers.deleteManager)

module.exports = router

