const express = require("express")
const productController = require("../controllers/product.controller")
const authMiddleware = require("../middlewares/auth.middlewares")

const router = express.Router()

router.post("/create-product", authMiddleware.identifyUser, authMiddleware.isAdmin, productController.createProduct)
router.get("/get-products", authMiddleware.identifyUser, productController.getProducts)
router.get("/product-details/:id", authMiddleware.identifyUser, productController.getProductDetails)
router.delete("/delete-product/:id", authMiddleware.identifyUser, productController.deleteProduct)
router.post("/addtocart/:id", authMiddleware.identifyUser, productController.addToCart)
router.post("/removefromcart/:id", authMiddleware.identifyUser, productController.removeFromCart)
router.get("/get-cart", authMiddleware.identifyUser, productController.getCart)
router.delete("/clear-cart", authMiddleware.identifyUser, productController.clearCart);

module.exports = router