const express = require("express");
const authControllerObject = require("../controller/authentication/authController");
let verifyToken = require('../middlewares/verifyToken');

let router = express.Router();


router.post("/register-user", authControllerObject.registerUser);
router.post("/verify-otp", authControllerObject.verifyOtp);
router.post("/login-user", authControllerObject.loginUser);
router.post("/send-otp", authControllerObject.sendOtp);
router.post("/forgot-password", authControllerObject.forgotPassword);

module.exports = router;