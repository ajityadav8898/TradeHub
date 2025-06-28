const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config(); // Add this line

const app = express();

// ✅ CORS Configuration (allow your frontend origin, e.g., React on localhost:3000)
app.use(cors({
  origin: "http://localhost:3000", // Replace with your frontend URL (e.g., React/Vite port)
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// MongoDB Atlas connection
const mongoURI = "mongodb+srv://ajityadav8898:Yajit%408898@cluster0.xyrjc.mongodb.net/ebooks-backend?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((error) => console.error("❌ MongoDB connection failed:", error));

// Use the ebooks routes (defined below)
const ebooksRouter = require("./routes/ebooks");
app.use("/ebooks", ebooksRouter);

// Start the server
const PORT = process.env.EBOOKS_PORT || 5001; // Use EBOOKS_PORT
app.listen(PORT, () => console.log(`🚀 Ebooks Server running on http://localhost:${PORT}`));