const mongoose = require("mongoose")

async function ConnectDB() {
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=> {
        console.log("DB is connected successfully")
    })
    .catch((err)=> {
        console.log(err)
    })
}

module.exports = ConnectDB