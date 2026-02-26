const mongoose = require("mongoose")

const saveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Foods"
    }
}, {timestamps: true})

const saveModel = mongoose.model("saves", saveSchema)

module.exports = saveModel