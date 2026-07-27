const express = require('express')
const cookireParser = require('cookie-parser')
const authroutes = require('./routes/auth.routes')
const app = express();

//middlewere 
app.use(express.json());
app.use(cookireParser());
app.use("/api/auth", authroutes)
module.exports = app;