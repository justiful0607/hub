const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());              // allow frontend requests
app.use(express.json());      // parse JSON bodies

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/patients", require("./routes/patients"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/reports", require("./routes/reports"));
app.use("/api/messages", require("./routes/messages"));

// Health check route
app.get("/", (req, res) => {
  res.send("CareHub backend is running ✅");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({ error: "Something went wrong on the server." });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
