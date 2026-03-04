const orderModel = require("../models/order.models")
const userModel = require("../models/user.models")

async function createOrder(req, res) {
    try {
        const userId = req.user.userId;  // 🔥 yaha change
        const { products, subTotal } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        const newOrder = new orderModel({
            userId,
            products,
            subTotal
        });

        await newOrder.save();

        res.status(201).json({
            success: true,
            order: newOrder
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function getAllOrders(req, res) {
    try {
        const orders = await orderModel
            .find()  
            .populate("userId", "username email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            order: orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function getAdminStats(req, res) {
    try {

        const totalUsers = await userModel.countDocuments();

        const activeOrders = await orderModel.countDocuments({
            status: { $in: ["Pending", "Processing", "Shipped"] }
        });

        const salesData = await orderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$subTotal" }
                }
            }
        ]);

        const totalSales = salesData[0]?.totalSales || 0;

        res.status(200).json({
            success: true,
            orderStats: {
                totalUsers,
                activeOrders,
                totalSales
            }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = { createOrder, getAllOrders, getAdminStats }