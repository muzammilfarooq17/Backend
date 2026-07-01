const express = require('express');
const noteModel = require("./models/note.model.js");

// 1) first server create krna . is file mai  
const app = express();
app.use(express.json());

// create 4 new apis to make connection between database and server.

// POST => Create a note (Yahan "/" add kar diya hai)
app.post("/notes", async (req, res) => {
    try {
        const data = req.body;
        
        await noteModel.create({
            title: data.title,
            description: data.description,
            age: data.age,
            degree: data.degree,
        });

        res.status(201).json({
            message: "Note Created Successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/notes",async(req,res)=>{
    const notes = await noteModel.find();

    // find() mehthod pora data fetch krta hai or return array krta hai .

    // findone() sirf single  {} data find krta hai na ki array of objects . 
    res.status(200).json({
        message:"Notes Fetch Successfully",
        notes: notes
    })
})


app.delete("/notes/:id",async (req,res)=>{
    const id = req.params.id;
    await noteModel.findOneAndDelete({
        _id: id 
        
    })
    res.status(200).json({
        message: "Note Deleted Succesfully"
    })
})

app.patch("/notes/:id",async(req,res)=>{
    const id = req.params.id;
    const description = req.body.description
    await noteModel.findByIdAndUpdate({
        _id: id
    },{
        description: description
    })
res.status(200).json({
    messgae: "Notes Updated Successfully"
})
})

module.exports = app;