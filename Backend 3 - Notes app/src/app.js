// main kaam hai is file ka server ko create krna . 
// POST is used to send data to the server and create a new resource.

// Postman (Short Definition):

// Postman is an API testing tool used by developers to send API requests and view API responses without writing frontend code.

// Uses of Postman:

// Test APIs
// Send GET, POST, PUT, DELETE requests
// View server responses
// Debug APIs

// One-line Exam Definition:

// Postman is an API testing tool used to send requests to APIs and check their responses.
const express = require('express')
const app = express()


const notes = [];

app.post('/notes',(req,res)=>{
    console.log(req.body);
    
    
})


module.exports = app