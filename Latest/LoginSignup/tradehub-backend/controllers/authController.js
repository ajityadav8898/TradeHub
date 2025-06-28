const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserActivity = require("../models/UserActivity");
const Session = require("../models/Session"); // ✅ Import Session Model
const LoginHistory = require("../models/LoginHistory"); // ✅ Import Login History Model

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Fallback for local testing

// ✅ User Signup function
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Email or username already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// ✅ User Login function (Fixed & Improved)
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

        // Store session in database
        const session = new Session({
            userId: user._id,
            username: user.username,
            loginTime: new Date(),
        });
        await session.save();

        // Store user activity in LoginHistory
        await LoginHistory.create({
            userId: user._id,
            username: user.username,
            action: "login",
            timestamp: new Date(),
        });

        res.json({
            message: "Login successful",
            user: { _id: user._id, username: user.username },
            token, // ✅ Send token to frontend
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error", details: error.message });
    }
};

// ✅ User Logout function (Fixed & Improved)
const logout = async (req, res) => {
    try {
        const { userId } = req.body; // ✅ Get userId from request body

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Find the latest session and update logout time
        const session = await Session.findOne({ userId, logoutTime: null }).sort({ loginTime: -1 });

        if (session) {
            session.logoutTime = new Date();
            await session.save();
        }

        // Save logout action in database
        await LoginHistory.create({
            userId: user._id,
            username: user.username,
            action: "logout",
            timestamp: new Date(),
        });

        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Server error", details: error.message });
    }
};

// ✅ Correct export
module.exports = {
    signup,
    login,
    logout
};
