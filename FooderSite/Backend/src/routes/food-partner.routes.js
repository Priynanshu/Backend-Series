const express = require("express")
const { authUserMiddleware } = require("../middlewares/auth.middlewares")
const foodPartnerController = require("../controllers/food-partner.controller")

const router = express.Router()

router.get("/:id", authUserMiddleware, foodPartnerController.getFoodPartnerById)

module.exports = router