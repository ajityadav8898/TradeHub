const express = require("express");
const router = express.Router();
const Session = require("../models/Session");

// 📌 **1. Get all user login sessions**
router.get("/logins", async (req, res) => {
    try {
        const sessions = await Session.find().sort({ loginTime: -1 });

        // Send only required fields (username, login time, status)
        const formattedSessions = sessions.map(session => ({
            _id: session._id,
            username: session.username || "Unknown",
            loginTime: session.loginTime,
            status: session.status || "Active"
        }));

        res.json(formattedSessions);
    } catch (error) {
        console.error("Error fetching sessions:", error);
        res.status(500).json({ message: "Error fetching sessions" });
    }
});

// 📌 **2. Terminate a user session**
router.post("/terminate/:sessionId", async (req, res) => {
    try {
        const sessionId = req.params.sessionId;
        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        // Set logout time and update status
        session.logoutTime = new Date();
        session.status = "Terminated"; // ✅ Mark session as terminated
        await session.save();

        res.json({ message: "Session terminated successfully" });
    } catch (error) {
        console.error("Error terminating session:", error);
        res.status(500).json({ message: "Error terminating session" });
    }
});

module.exports = router;