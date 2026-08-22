const express = require("express");
const router = express.Router();
const {
  userRegisterContoller,
  userLoginController,
} = require("../controllers/auth.controller");

// auth register
router.post("/register", userRegisterContoller);

// auth user login
router.post("/login", userLoginController);

module.exports = router;