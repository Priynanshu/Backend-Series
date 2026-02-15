const authController = require("../controllers/user.controller")
const express = require("express")
const authMiddleware = require("../middlewares/isAuthenticated")
const { userSchema, validate } = require("../validators/userValidate")
const authTwoController = require("../controllers/userTwo.controller")

const router = express.Router()

// router.post("/register", validate(userSchema), authController.registerUser)
router.post("/register", authTwoController.register)
// router.post("/verify", authController.verification)
router.post("/verify", authTwoController.verify)
// router.post("/login", authController.loginUser)
router.post("/login", authTwoController.login)
// router.post("/logout", authMiddleware.isAuthenticated, authController.logoutUser )
router.post("/logout", authMiddleware.isAuthenticated, authTwoController.logout )
// router.post("/forgot-password", authController.forgotPassword)
router.post("/forgot-password", authTwoController.forgotPassword)
// router.post("/verify-otp/:id", authController.verifyOTP)
// router.post("/change-password/:id", authController.changePassword)
router.post("/change-password/:id", authTwoController.changePassword)

module.exports = router