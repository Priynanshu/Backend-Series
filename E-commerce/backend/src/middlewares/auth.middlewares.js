const jwt = require("jsonwebtoken")
const userModel = require("../models/user.models");

async function identifyUser(req, res, next) {
    const token = req.cookies.token
    
    if (!token) {
        return res.status(401).json({
            message: "Token not provided, Unauthorized access"
        })
    }

    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (err) {
        return res.status(401).json({
            message: "user not authorized"
        })
    }

    req.user = decoded

    next()
}

const isAdmin = async (req, res, next) => {
    try {
        // 1. Pehle check karein req.user exist karta hai ya nahi
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized, no user data" });
        }

        // 2. req.user ke andar hi 'role' hota hai jo aapne JWT sign karte waqt daala tha
        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access only"
            });
        }

        next();
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {identifyUser, isAdmin}