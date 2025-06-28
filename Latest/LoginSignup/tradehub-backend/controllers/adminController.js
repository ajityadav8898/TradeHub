const User = require('../models/userModel');  // Import User model
const Session = require('../models/sessionModel'); // Import Session model (if you have one)

// Fetch all user login sessions for the admin panel
exports.getAllUserSessions = async (req, res) => {
    try {
        const sessions = await Session.find().sort({ loginTime: -1 }); // Get all sessions, sorted by login time
        res.json(sessions);
    } catch (error) {
        console.error("Error fetching user sessions:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Terminate a specific user session
exports.terminateUserSession = async (req, res) => {
    const { sessionId } = req.params;

    try {
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        // Update session status to 'terminated' and set logout time
        session.status = 'Terminated';
        session.logoutTime = new Date();
        await session.save();

        res.json({ message: "User session terminated successfully" });
    } catch (error) {
        console.error("Error terminating session:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
