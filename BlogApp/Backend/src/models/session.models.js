const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

const sessionModel = mongoose.model("session", sessionSchema)

module.exports = sessionModel