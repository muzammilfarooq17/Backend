async function createAlbum(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You don't have access to create album",
            });
        }

        const { title, musicIds } = req.body;

        const album = await albumModel.create({
            title,
            musics: musicIds,
            artist: decoded.id,
        });

        return res.status(201).json({
            message: "Album created successfully",
            album:{
                id:album._id,
                title:album.title,
                artist:album.artist,
                musics:album.musics,
            }
        });

    } catch (err) {
        console.log(err);

        return res.status(401).json({
            message: "Unauthorized",
        });
    }
}

module.exports = {
    createMusic,
    createAlbum,
};