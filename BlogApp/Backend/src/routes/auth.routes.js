const express = require("express")
const authController = require("../controllers/user.controller")
const authMiddleware = require("../middlewares/isAuthenticated")
const upload = require("../middlewares/multer")

const router = express.Router()

router.post("/register", upload.single("profileImage"), authController.register)
router.post("/login", authController.login)
router.post("/logout", authMiddleware.isAuthenticated, authController.logout)
router.put("/edit/:userId", authMiddleware.isAuthenticated, authController.editUser)

module.exports = router