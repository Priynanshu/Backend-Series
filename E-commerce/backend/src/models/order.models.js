const mongoose = require("mongoose");
const crypto = require("crypto");

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Ensure this matches your User model name
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            priceAtPurchase: {
                type: Number,
                required: true
            }
        }
    ],
    subTotal: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    }
}, { timestamps: true });

// Auto-generate Order ID before saving
orderSchema.pre("save", async function () {
    if (!this.orderId) {
        this.orderId = `MOOD-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    }
});

module.exports = mongoose.model("Order", orderSchema);