const express = require('express')
const multer = require('multer')
const uploadfile = require('../src/service/storage.service');
const postModel = require("./models/post.model")

const app = express();
app.use(express.json());

const upload = multer({storage: multer.memoryStorage()})

app.post("/Create-post",upload.single("image"), async(req,res)=>{
    console.log(req.body);
    console.log(req.file );

    const result = await uploadfile(req.file.buffer)
    const post = await postModel.create({
        Image: result.url,
        caption: req.body.caption,
    })
        return res.status(201).json({
            message:"post created succesfully",
            post
        })
})


// Route ko "/posts" kar dein taake Postman se match ho jaye
app.get("/posts", async (req, res) => {
    try {
        // Variable ka naam posts (plural) rakh lein
        const posts = await postModel.find(); 
        
        return res.status(200).json({ // Status code 200 fetch ke liye best hai
            message: "Posts Fetched Successfully",
            posts // Ab yeh variable sahi se crash kiye bina chala jayega
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});







module.exports = app;