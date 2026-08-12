const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.service");

// ==================== CREATE MUSIC ====================

async function createMusic(req, res) {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            message: "No file uploaded",
        });
    }

    try {
        const base64Data = `data:${file.mimetype};base64,${file.buffer.toString(
            "base64"
        )}`;

        const result = await uploadFile(
            base64Data,
            file.originalname
        );

        const music = await musicModel.create({
            uri: result.secure_url,
            title,
            artist: req.user.id,
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

    } catch (error) {
        return res.status(500).json({
            message: "Failed to upload music",
            error: error.message,
        });
    }
}


// ==================== CREATE ALBUM ====================

async function createAlbum(req, res) {
    try {
        const { title, musics } = req.body;

        const album = await albumModel.create({
            title,
            musics,
            artist: req.user.id,
        });

        return res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics,
            },
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to create album",
            error: error.message,
        });
    }
}


// ==================== EXPORT ====================

module.exports = {
    createMusic,
    createAlbum,
};