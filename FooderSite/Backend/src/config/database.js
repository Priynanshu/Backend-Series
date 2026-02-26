const mongoose = require("mongoose")

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected Successfully")
    } catch (err) {
        console.log("Error From Connecting to Database: ", err)
    }
}

module.exports = connectDB