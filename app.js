const express = require("express");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");

const app = express();

// Middleware đọc JSON từ request
app.use(express.json());

// Kết nối MongoDB
connectDB();

// Routes
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);

// Route test server
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Xử lý route không tồn tại
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Port server
const PORT = 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});