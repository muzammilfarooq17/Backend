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
app.use(express.json()) // it is a middlewere which allows to get readable data to express body in raw format ..

const notes = [];
//post req notes
app.post('/notes',(req,res)=>{
    notes.push(req.body)
    res.status(201).json({                     // server pr data bhejne kai lye
        message:"notes created Sucessfully."
    }) 
})

//get request notes
app.get("/notes",(req,res)=>{
    res.status(200).json({
        message:"notes fetch Sucessfully.", // server sai data mangwane kai lye
        notes:notes
    })
})

// delete request Notes/index
app.delete("/notes/:index",(req,res)=>{
    const index = req.params.index
    delete notes [index]              // server data pr ho or delete krne kai lye
    res.status(200).json({
        message:"Note Deleted Sucessfully"

    })
})

app.patch("/notes/:index", (req, res) => {
    // Convert the string parameter (like "1") into a real JavaScript number (1)
    const index = Number(req.params.index); 
    const title = req.body.title;

    // Now it will correctly check notes[1]
    if (notes[index] === undefined || notes[index] === null) {
        return res.status(404).json({
            message: "Note not found at this index!"
        });
    }

    notes[index].title = title;
    
    res.status(200).json({
        message: "Note Updated Successfully"
    });
});

module.exports = app