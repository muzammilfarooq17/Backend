const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        // Fixed typo: process.env (was procces.env)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "Forbidden: Access restricted to artists" });
        }

        // Attach decoded payload to req.user for use in controllers
        req.user = decoded;

        next();
    } catch (err) {
        console.error("Auth Middleware Error:", err);
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
}

async function authUser(req,res,next){
    const token = req.cookies.token

     if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

         if (decoded.role !== "user" && jwt.decode.role !== "artist  ") {
            return res.status(403).json({ message: "You Dont Have Acess" });
        }


    }catch(err){
        console.error("Auth Middleware Error:", err);
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });

    }
}

// Fixed export to match authMiddleware.authArtist in routes
module.exports = {
    authArtist,
    authUser,
};