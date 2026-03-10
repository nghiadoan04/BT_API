const express = require("express")
const connectDB = require("./config/db")

const userRoutes = require("./routes/userRoutes")
const roleRoutes = require("./routes/roleRoutes")

const app = express()

app.use(express.json())

connectDB()

app.use("/users", userRoutes)
app.use("/roles", roleRoutes)

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000")
})