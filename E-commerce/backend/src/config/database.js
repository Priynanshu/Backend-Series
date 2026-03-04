const mongoose = require("mongoose")

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("successfully connected to DB")
    } catch (err) {
        console.log("Error From Database Interaction: ", err)
    }
}

module.exports = connectDB