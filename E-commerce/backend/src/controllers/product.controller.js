const productModel = require("../models/product.models")
const cartModel = require("../models/cart.models")
require("dotenv").config()

async function createProduct(req, res) {
    try {
        const { name, category, price, description, stock, image } = req.body;

        if (!image) {
            return res.status(400).json({
                message: "Image URL is required"
            });
        }

        const product = await productModel.create({
            name,
            category,
            price,
            description,
            stock,
            image
        })

        return res.status(201).json({
            message: "Product Created Successfully",
            products: product
        })

    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function getProducts(req, res) {
    try {
        const product = await productModel.find()

        if(!product) {
            return res.status(401).json({
                message: "No Prducts are available"
            })
        }

        return res.status(200).json({
            message: "Product Fetched Succssfully",
            count: product.length,
            products: product
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function getProductDetails(req, res) {
    try {
        const {id} = req.params
        const product = await productModel.findById(id);

        if(!product) {
            return res.status(404).json({
                message: "Product not Found"
            })
        }

        return res.status(200).json({
            message: "Product detail fetch successfully",
            product
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function deleteProduct(req, res) {
    try {
        const {id} = req.params
        await productModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Product Deleted Successfully"
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function addToCart(req, res) {
    try {
        // SAHI TARIKA: Ya toh direct id nikalen ya params se extract karein
        const productId = req.params.id; 
        const userId = req.user.userId; 

        if (!productId) {
            return res.status(400).json({ message: "Product ID missing in URL" });
        }

        let cartItem = await cartModel.findOne({ user: userId, product: productId });

        if (cartItem) {
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            cartItem = await cartModel.create({
                user: userId,
                product: productId,
                quantity: 1
            });
        }

        // Optional: .populate("product") use karein agar frontend pe image/name chahiye
        const populatedItem = await cartItem.populate("product");

        return res.status(200).json({
            success: true,
            message: "Product added to cart",
            cartItem: populatedItem
        });

    } catch (err) {
        console.error("Cart Error:", err);
        return res.status(500).json({ message: err.message });
    }
}

async function removeFromCart(req, res) {
    try {
        const productId = req.params.id; // Fix here too
        const userId = req.user.userId; // Ensure it matches your token (userId not _id)

        const cartItem = await cartModel.findOne({ user: userId, product: productId });

        if (!cartItem) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
        } else {
            await cartModel.findByIdAndDelete(cartItem._id);
            return res.status(200).json({ success: true, message: "Item removed from cart" });
        }

        return res.status(200).json({
            success: true,
            message: "Quantity decreased",
            cartItem: await cartItem.populate("product")
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function getCart(req, res) {
    try {
        const userId = req.user.userId;
        // User ka saara cart data nikaalein aur product details populate karein
        const cartItems = await cartModel.find({ user: userId }).populate("product");
        
        return res.status(200).json({
            success: true,
            cartItems
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function clearCart(req, res) {
    try {
        await cartModel.deleteMany({ userId: req.user._id });

        res.status(200).json({
            success: true,
            message: "Cart cleared"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductDetails,
    deleteProduct,
    addToCart,
    removeFromCart,
    getCart,
    clearCart
}