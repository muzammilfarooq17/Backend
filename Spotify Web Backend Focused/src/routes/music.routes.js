const express = require("express");
const multer = require("multer");
const path = require("path");

const musicController = require("../controllers/music.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

const router = express.Router();

// ==================== MULTER CONFIGURATION ====================
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 15 * 1024 * 1024, // 15 MB file size limit
    },
    fileFilter: (req, file, cb) => {
        // Allowed extension patterns
        const allowedExtensions = /mp3|wav|m4a|flac|ogg|aac/;
        const isExtValid = allowedExtensions.test(
            path.extname(file.originalname).toLowerCase()
        );

        // Allowed MIME types (including generic binary types sent by some clients/Postman)
        const isMimeValid =
            file.mimetype.startsWith("audio/") ||
            file.mimetype === "application/octet-stream";

        if (isExtValid || isMimeValid) {
            cb(null, true);
        } else {
            cb(new Error("Only audio files are allowed!"), false);
        }
    },
});

// Middleware to catch Multer file validation errors cleanly
const handleUpload = (req, res, next) => {
    upload.single("music")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: `Upload error: ${err.message}` });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};

// ==================== MUSIC ROUTES ====================

// Upload single track (Artist only)
router.post(
    "/upload",
    authMiddleware.authArtist,
    handleUpload,
    musicController.createMusic
);

// ==================== ALBUM ROUTES ====================

// Create new album (Artist only)
router.post(
    "/album",
    authMiddleware.authArtist,
    musicController.createAlbum
);
router.get("/",authMiddleware.authUser,musicController.getAllMusics)
router.get("/",authMiddleware.authUser,musicController.getAllAlbums)


module.exports = router;