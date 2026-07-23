const express = require('express');
const authController = require('../controllers/auth.controller');

const routes = express.Router();

routes.post('/Register', authController.registerUser);

module.exports = routes;