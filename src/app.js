const express = require("express");
const cors = require("cors");

const leadRoutes = require("./routes/leadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "AI Business Agent API is running"
    });
});

app.use("/api/leads", leadRoutes);

module.exports = app;