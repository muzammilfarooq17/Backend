const musicModel = require('../models/music.model')
const jwt = require('jsonwebtoken')

async function createModel(req,res){
    const token = req.cookie.token;

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try{
    const decoded = jwt.verify(token.process.env.JWT_SECRET)
    if(decoded.role !== "artist"){
        return res.status(403).json({message:"You don't have acsess to create a Music "})
    }
    }catch (err){
        return res.status(401).json({message:"Unauthorized"})
    }

}