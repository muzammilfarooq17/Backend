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
const authUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;
        
        if (!token) {
            // IF TOKEN MISSING -> Return response immediately!
            return res.status(401).json({ message: "Unauthorized access: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // MUST CALL NEXT TO PASS CONTROL TO THE CONTROLLER
        next(); 

    } catch (error) {
        // IF TOKEN INVALID -> Return response immediately!
        return res.status(401).json({ message: "Invalid or expired token", error: error.message });
    }
};

// Fixed export to match authMiddleware.authArtist in routes
module.exports = {
    authArtist,
    authUser,
};