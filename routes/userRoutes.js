const express = require("express");
const userControllerObject = require("../controller/userController");
let verifyToken = require('../middlewares/verifyToken');

let router = express.Router();

router.post("/update-password", verifyToken.verifyToken, userControllerObject.updatePassword);
router.get("/user-profile", verifyToken.verifyToken, userControllerObject.userProfile);

module.exports = router;