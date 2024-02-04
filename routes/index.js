let router = require("express").Router();
let authRoutes = require("./authRoutes");
let userRoutes = require("./userRoutes");


router.use("/auth", authRoutes);
router.use("/user", userRoutes);

module.exports = router;