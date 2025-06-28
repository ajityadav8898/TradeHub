require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const connectDB = require("./config/db");
const SessionModel = require("./models/Session");

// ✅ Initialize Express App
const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ CORS Configuration
const allowedOrigins = [
    "http://127.0.0.1:5555",
    "http://localhost:5555",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:3000"
];

const corsOptions = {
    origin: function (origin, callback) {
        console.log("Request Origin:", origin);
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error("Blocked Origin:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ MongoDB Session Store
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions"
});

store.on("error", (error) => {
    console.error("⚠️ Session Store Error:", error);
});

// ✅ Session Middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your_secret_key",
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            secure: false
        }
    })
);

// ✅ Middleware to save session to custom Session model
app.use(async (req, res, next) => {
    if (req.session && req.session.user && !req.session.sessionLogged) {
        console.log("Creating new session for user:", req.session.user);
        const newSession = new SessionModel({
            userId: req.session.user.id,
            username: req.session.user.username,
            loginTime: new Date(),
        });
        await newSession.save();
        console.log("Session created with ID:", newSession._id);
        req.session.sessionLogged = true;
        req.session.sessionId = newSession._id;
    }
    next();
});

// ✅ Serve Static Files
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
console.log("✅ Serving static files from:", publicPath);

// ✅ Import and Use Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Add Logout Endpoint
app.post("/api/auth/logout", async (req, res) => {
    try {
        if (!req.session.user || !req.session.sessionId) {
            console.log("No session found:", { user: req.session.user, sessionId: req.session.sessionId });
            return res.status(400).json({ message: "No user session found" });
        }

        console.log("Logging out session with ID:", req.session.sessionId);
        const userSession = await SessionModel.findById(req.session.sessionId);

        if (userSession && !userSession.logoutTime) {
            userSession.logoutTime = new Date();
            await userSession.save();
            console.log("Updated logoutTime for session:", userSession);
        } else {
            console.log("Session not found or already logged out:", userSession);
        }

        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).json({ message: "Error logging out" });
            }
            res.json({ message: "Logged out successfully" });
        });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Error logging out" });
    }
});

// ✅ Debug: Check if Sessions are Created
app.get("/debug/sessions", async (req, res) => {
    try {
        const allSessions = await store.client.db().collection("sessions").find().toArray();
        res.json(allSessions);
    } catch (error) {
        console.error("Error fetching session data:", error);
        res.status(500).json({ message: "Error fetching session data" });
    }
});

// ✅ Serve Admin Page
app.get("/admin.html", (req, res) => {
    res.sendFile(path.join(publicPath, "admin.html"));
});

// ✅ Serve User Homepage
app.get("/index.html", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

// ✅ Handle Undefined Routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// ✅ Start the Server
const PORT = process.env.LOGIN_PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Login Server running on http://localhost:${PORT}`));