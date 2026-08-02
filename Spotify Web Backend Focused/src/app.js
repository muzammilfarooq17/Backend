const express = require('express')
const cookireParser = require('cookie-parser')
const authroutes = require('./routes/auth.routes')
const musicroutes = require('./routes/music.routes')
const app = express();

//middlewere 
app.use(express.json());
app.use(cookireParser());
app.use("/api/auth", authroutes)
app.use("/api/music", musicroutes)

module.exports = app;