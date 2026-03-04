const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    }
})

const cartModel = mongoose.model("cart", cartSchema)

module.exports = cartModel