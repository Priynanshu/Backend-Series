const authController = require("../controllers/user.controller")
const express = require("express")
const authMiddleware = require("../middlewares/isAuthenticated")
const { userSchema, validate } = require("../validators/userValidate")

const router = express.Router()

router.post("/register", validate(userSchema), authController.registerUser)
router.post("/verify", authController.verification)
router.post("/login", authController.loginUser)
router.post("/logout", authMiddleware.isAuthenticated, authController.logoutUser )
router.post("/forgot-password", authController.forgotPassword)
router.post("/verify-otp/:id", authController.verifyOTP)
router.post("/change-password/:id", authController.changePassword)

module.exports = router