const express = require("express")
const authRoutes = require("./routes/auth.routes")
const foodRoutes = require("./routes/food.routes")
const foodPartnerRoutes = require("./routes/food-partner.routes")
const cookie = require("cookie-parser")
const cors = require("cors")

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookie())

app.use("/api/auth", authRoutes)
app.use("/api/food", foodRoutes)
app.use("/api/food-partner", foodPartnerRoutes)

module.exports = app