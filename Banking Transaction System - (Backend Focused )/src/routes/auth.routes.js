const express = require('express');
const authController = require("../controllers/auth.controller")

const router = express.Router()



router.post("/register",authController.userRegisterContoller)





module.exports = router