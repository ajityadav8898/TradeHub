const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

const API_BASE_URL = process.env.DHAN_API_BASE_URL;
const ACCESS_TOKEN = process.env.DHAN_ACCESS_TOKEN;

// 📌 API Route to Get Portfolio Data
app.get("/api/portfolio", async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/portfolio`, {
      headers: {
        "access-token": ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
