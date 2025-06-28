const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware to allow all requests (no authentication required)
const authMiddleware = (req, res, next) => {
    next(); // Allow all requests without checking for tokens or roles
};

// ✅ (Optional) Middleware to check admin access (commented out since not needed)
const verifyAdmin = (req, res, next) => {
    // This is now unnecessary but kept for reference
    // if (req.user?.role === "admin") {
    //     return next(); // Proceed if user is an admin
    // }
    // return res.status(403).json({ error: "Forbidden: Admins only" });
};

// ✅ Export only the auth middleware (which now does nothing)
module.exports = authMiddleware;