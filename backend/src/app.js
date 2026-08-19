const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());

// Parse JSON request bodies
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Task Manager API is running"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy"
    });
});

app.use("/api/tasks", taskRoutes);

module.exports = app;