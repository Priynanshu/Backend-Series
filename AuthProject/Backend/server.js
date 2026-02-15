const app = require("./src/app")
const ConnectDB = require("./src/db/database")

require("dotenv").config()
ConnectDB()

app.listen(3000, ()=> {
    console.log("Server is running on Port 3000")
})