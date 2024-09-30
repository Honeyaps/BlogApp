const jwt = require("jsonwebtoken")
require("dotenv").config()

function Auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(403).json({ msg: "Token not provided or invalid format" });
    }

    const token = header.split(" ")[1]; // Extract the token from the header
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id; // Ensure you are extracting the user ID correctly
        console.log("User ID from token:", req.userId); // Log the user ID
        next();
    } catch (e) {
        console.error(e);
        return res.status(403).json({ msg: "Invalid token" });
    }
}


module.exports = Auth

