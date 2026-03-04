const express = require("express");
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middlewares"); // Middleware zaroori hai!

const router = express.Router();

// Middleware add karein taaki user authorized ho tabhi order bane
router.post("/create", authMiddleware.identifyUser, orderController.createOrder);
router.get("/get-orders", authMiddleware.identifyUser,  authMiddleware.isAdmin, orderController.getAllOrders);
router.get("/admin-stats", authMiddleware.identifyUser, authMiddleware.isAdmin, orderController.getAdminStats)

module.exports = router;