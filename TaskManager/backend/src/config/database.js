const mongoose = require("mongoose")

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=> {
            console.log("Connected To Database Succefully")
        })
    }catch(err) {
        console.log("Error From Database Connection: ", err)
    }
}

module.exports = connectToDB