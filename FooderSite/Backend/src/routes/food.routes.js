const express = require("express")
const authMiddleware = require("../middlewares/auth.middlewares")
const foodController = require("../controllers/food.controller")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})

const router = express.Router()

router.post("/", authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood)
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItem)
router.post("/like", authMiddleware.authUserMiddleware, foodController.likeFoodItem)
router.post("/save", authMiddleware.authUserMiddleware, foodController.saveFood)
router.get("/save", authMiddleware.authUserMiddleware, foodController.getSaveFood)

module.exports = router