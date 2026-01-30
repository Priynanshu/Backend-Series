const mongoose = require("mongoose")

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        console.log("Connected To DataBase")
    })
}

module.exports = connectToDB