const router = require("express").Router();
const addressControllers = require("../controllers/address.controllers");


router.get("/address/:id", addressControllers.getAddressById)
router.post("/address", addressControllers.createAddress);
router.delete("/address", addressControllers.deleteAddress);
router.put("/address", addressControllers.updateAddress);
module.exports = router