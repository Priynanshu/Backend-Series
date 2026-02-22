const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low"
    },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Rejected"],
        default: "Pending"
    },
    assign: {
        type: String
    },
    coverImage: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
})

const taskModel = mongoose.model("Tasks", taskSchema)

module.exports = taskModel