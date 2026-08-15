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

    if (!title) {
        return res.status(400).json({
            message: "Music title is required",
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
        console.log(error);

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

        if (!title) {
            return res.status(400).json({
                message: "Album title is required",
            });
        }

        if (!Array.isArray(musics)) {
            return res.status(400).json({
                message: "Musics must be an array",
            });
        }

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


// ==================== GET ALL MUSICS ====================

async function getAllMusics(req, res) {
    try {
        const musics = await musicModel
            .find()
            .limit(10)
            .populate("artist", "username email");

        return res.status(200).json({
            message: "Music fetched successfully",
            musics,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to fetch music",
            error: error.message,
        });
    }
}


// ==================== GET ALL ALBUMS (FIXED) ====================

async function getAllAlbums(req, res) {
    try {
        const albums = await albumModel
            .find()
            .select("title artist")
            .populate("artist", "username email")
            .populate("musics");

        return res.status(200).json({
            message: "Albums fetched successfully",
            albums,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to fetch albums",
            error: error.message,
        });
    }
}

async function getAlbumById(req, res) {
    try {
        const albumId = req.params.albumId;

        const album = await albumModel
            .findById(albumId)
            .populate("artist", "username email")
            .populate("musics");

        if (!album) {
            return res.status(404).json({
                message: "Album not found",
            });
        }

        return res.status(200).json({
            message: "Album fetched successfully",
            album,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to fetch album",
            error: error.message,
        });
    }
}

// ==================== EXPORT ====================

module.exports = {
    createMusic,
    createAlbum,
    getAllMusics,
    getAllAlbums,
    getAlbumById,
};