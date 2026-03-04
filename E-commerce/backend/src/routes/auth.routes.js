const express = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middlewares") // Middleware import karein

const router = express.Router()

// 1. Register Route
router.post("/register", authController.userRegister)

// 2. Login Route
router.post("/login", authController.userLogin)
router.post("/logout", authController.logoutUser)

// 3. Get Current User Profile (getMe)
// Isme 'identifyUser' check karega ki token valid hai ya nahi
// Phir 'getMe' database se user ka data nikal kar bhejega
router.get("/profile", authMiddleware.identifyUser, authController.getMe)

module.exports = router