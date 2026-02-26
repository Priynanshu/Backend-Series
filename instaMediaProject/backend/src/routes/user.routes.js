const express = require("express")
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middlewares")

const router = express.Router()

router.post("/follow/:username", identifyUser, userController.followUserController)
router.post("/unfollow/:username", identifyUser, userController.unFollowUserController)
router.post("/status/:username", identifyUser, userController.userFollowingStatus)
router.get("/followers/:username", identifyUser, userController.userFollowersController)

module.exports = router
