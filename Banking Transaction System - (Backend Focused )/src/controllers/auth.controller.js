const userModel  = require("../models/user.model");


// User Registration Controller.
//POST /api/auth/register
function userRegisterContoller(req,res){
    const {email , password , name} = req.body
}

module.exports = {
    userRegisterContoller,
}