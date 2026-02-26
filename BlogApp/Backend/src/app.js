const express = require("express")
const authRoutes = require("../src/routes/auth.routes")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(express.json())
app.use(cors())

// Static files serve karne ke liye
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/api/v1/user", authRoutes)

module.exports = app