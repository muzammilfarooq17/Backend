const express = require('express');
const authController = require('../controllers/auth.controller');
const { router } = require('../app');

const routes = express.Router();

routes.post('/Register', authController.registerUser);
routes.get('/test',(req,res)=>{
    console.log("cookies:",req.cookies)
    res.json({
        message:"Test route",
        cookies: req.cookies
    })
    
})



module.exports = routes;