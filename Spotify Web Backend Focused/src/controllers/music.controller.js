const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");

async function createMusic(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You don't have access to create music",
            });
        }
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    const { title } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            message: "No file uploaded",
        });
    }

    try {
        // Safe check: Buffer ko base64 string stream mein convert kar rahe hain wrapper ke sath
        const base64Data = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        
        const result = await uploadFile(base64Data, file.originalname);

        const music = await musicModel.create({
            uri: result.secure_url,
            title,
            artist: decoded.id,
        });

        return res.status(201).json({
            message: "Music uploaded successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist,
            },
        });
    } catch (uploadError) {
        return res.status(500).json({
            message: "Failed to upload music to storage",
            error: uploadError.message || uploadError
        });
    }
}

module.exports = { createMusic };