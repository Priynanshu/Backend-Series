const express = require("express")
const authRoutes = require("../src/routes/auth.routes")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/user", authRoutes)


module.exports = app