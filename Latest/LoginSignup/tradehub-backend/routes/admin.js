const express = require("express");
const router = express.Router();
const UserActivity = require("../models/UserActivity");
const { isAdmin } = require("../middleware/authMiddleware"); // Ensure admin-only access

// Get all user activities (Admin only)
router.get("/activity-log", isAdmin, async (req, res) => {
    try {
        const activities = await UserActivity.find().sort({ timestamp: -1 });
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
