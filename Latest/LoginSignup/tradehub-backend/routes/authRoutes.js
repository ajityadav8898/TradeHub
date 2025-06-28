const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserActivity = require("../models/UserActivity");
const Session = require("../models/Session");

// ✅ LOGIN ROUTE
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log("Login Failed: User not found");
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Login Failed: Invalid credentials");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // ✅ Store session in MongoDB
        const newSession = new Session({
            userId: user._id,
            username: user.username,
            loginTime: new Date(),
            logoutTime: null
        });
        await newSession.save();
        console.log("✅ Session saved for:", user.username);

        // ✅ Log user activity
        const userActivity = new UserActivity({
            userId: user._id,
            username: user.username,
            action: "login",
            timestamp: new Date()
        });
        await userActivity.save();
        console.log("✅ User activity recorded for:", user.username);

        res.json({ token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ SIGNUP ROUTE
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Signup Failed: User already exists");
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        console.log("✅ New user registered:", username);

        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ LOGOUT ROUTE
router.post("/logout", async (req, res) => {
    try {
        const { userId, username } = req.body;

        // Find the user's active session
        const activeSession = await Session.findOne({ userId, logoutTime: null });

        if (activeSession) {
            activeSession.logoutTime = new Date();
            await activeSession.save();
            console.log("✅ Logout time updated for:", username);
        } else {
            console.log("⚠ No active session found for user:", username);
        }

        // ✅ Log user activity
        const userActivity = new UserActivity({
            userId: userId,
            username: username,
            action: "logout",
            timestamp: new Date()
        });
        await userActivity.save();
        console.log("✅ Logout activity recorded for:", username);

        res.json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
