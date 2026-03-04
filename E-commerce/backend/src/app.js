const express = require("express")
const cookie = require("cookie-parser")
const authRoutes = require("./routes/auth.routes")
const adminRoutes = require("./routes/product.routes")
const orderRoutes = require("./routes/order.routes")
const cors = require("cors")
const app = express()

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: [ "GET", "POST", "PUT", "DELETE" ],
}))

app.use(cookie())

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/product", adminRoutes)
app.use("/api/order", orderRoutes)


module.exports = app