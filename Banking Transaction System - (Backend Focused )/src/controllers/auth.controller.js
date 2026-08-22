const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const emailService = require("../services/email.service");

// User Registration Controller
// POST /api/auth/register
async function userRegisterContoller(req, res) {
  try {
    const { email, password, name } = req.body;

    const isExist = await userModel.findOne({ email });

    if (isExist) {
      return res.status(422).json({
        message: "User Is Already Exist with this Email",
        status: "failed",
      });
    }

    const user = await userModel.create({
      email,
      password,
      name,
    });

    const token = jwt.sign(
      { userid: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    try {
      await emailService.sendRegistrationEmail(user.email, user.name);
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr.message);
    }

    res.cookie("token", token);

    return res.status(201).json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
}

// User Login Controller
// POST /api/auth/login
async function userLoginController(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Email Or Password is Invalid",
        status: "Failed",
      });
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Email Or Password is Invalid",
        status: "Failed",
      });
    }

    const token = jwt.sign(
      { userid: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.cookie("token", token);

    return res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
}

module.exports = {
  userRegisterContoller,
  userLoginController,
};