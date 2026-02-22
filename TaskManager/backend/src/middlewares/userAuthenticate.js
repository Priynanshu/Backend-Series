const jwt = require("jsonwebtoken")

async function identifyUser(req, res, next) {
    try {
        const token = req.cookies?.token; // Optional chaining use karein safely

        if (!token) {
            // Status 401 zyada sahi hai unauthorized ke liye
            return res.status(401).json({ 
                message: "No token found, please login" 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT Error:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = identifyUser
