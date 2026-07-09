const express = require('express');
const multer = require('multer');
const uploadfile = require('../src/service/storage.service');
const postModel = require("./models/post.model");
const cors = require("cors");

const app = express();

// CORS ko sab se upar rukhna behtar hai
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/Create-post", upload.single("image"), async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const result = await uploadfile(req.file.buffer);
        
        const post = await postModel.create({
            image: result.url, // 🟢 FIX: 'Image' ko 'image' (small i) kar diya taake frontend se match kare
            caption: req.body.caption,
        });

        return res.status(201).json({
            message: "post created successfully",
            post
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating post" });
    }
});

app.get("/posts", async (req, res) => {
    try {
        const posts = await postModel.find(); 
        
        return res.status(200).json(posts); // 🟢 FIX: Direct posts array bhejein taake frontend map asani se chal sake
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});

// 🟢 ZAROORI CHECK: Agar aap kisi aur file me app.listen nahi chala rahe, 
// to isey uncomment (un-comment) kar dein:
// app.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;