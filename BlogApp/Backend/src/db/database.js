const mongoose = require("mongoose")

async function connectDB() {
    try {
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=> {
        console.log("Database Connnected Successfully")
    })
    } catch (error) {
        console.log("Erro from database connection: ", error)
    }
}

module.exports = connectDB