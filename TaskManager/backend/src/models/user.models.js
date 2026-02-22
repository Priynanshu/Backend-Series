const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        default: "https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    bio: {
        type: String,
        default: "Please Fill Your Bio 🚀"
    }
}, {timestamps: true})

const userModel = mongoose.model("Users", userSchema)

module.exports = userModel