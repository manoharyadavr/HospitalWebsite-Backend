const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const appointmentRoutes = require("./routes/appointmentRoutes");
const contactRoutes = require("./routes/contactRoutes")

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json()); // Allows JSON request body
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"], // ✅ Allow frontend requests
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type"],
}));

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Routes
app.use("/api/appointments", appointmentRoutes); // ✅ Correct path
app.use("/api/contact", contactRoutes)

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

