const express = require("express")
const authController = require("../controllers/auth.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()   

router.post("/register", authController.register)
router.post("/login", authController.login)
router.put("/edit/:userId",  upload.single("profileImg"), authController.editUser)
router.post("/logout", authController.logout)

module.exports = router