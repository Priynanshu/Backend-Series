const express = require("express")
const authRoutes = require("./routes/auth.routes")
const cookie = require('cookie-parser')
const taskRoutes = require("./routes/task.routes")
const cors = require("cors")

const app = express()

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: [ "GET", "POST", "PUT", "DELETE" ],
})) 

app.use(express.json())
app.use(cookie())
require("dotenv").config()

app.use("/api/auth", authRoutes)
app.use("/api/task", taskRoutes)


module.exports = app