const router = require("express").Router();
const messageControllers = require("../controllers/message.controllers");

router.post("/", messageControllers.sendMessage);

module.exports = router;
