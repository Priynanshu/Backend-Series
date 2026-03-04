const app = require("./src/app")
const connectDB = require("./src/config/database")
require("dotenv").config()

connectDB()

app.listen(3000, ()=> {
    console.log("Server is running on PORT 3000")
})