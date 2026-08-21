const express = require("express");
const router = express.Router();
const {
  userRegisterContoller,
  userLoginController,
  resendEmailController,
} = require("../controllers/auth.controller");
//auth register
router.post("/register", userRegisterContoller);
// auth user login
router.post("/login", userLoginController);
// emailsend and resend
router.post("/resend-email", resendEmailController);

module.exports = router;