const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");
const userController = require("../controller/userController");

router.post("/login", authController.login);
router.post("/add", userController.addUser);

module.exports = router;
