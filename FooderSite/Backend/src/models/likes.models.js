const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Foods"
    }
}, {timestamps: true})

const likeModel = mongoose.model("likes", likeSchema)

module.exports = likeModel