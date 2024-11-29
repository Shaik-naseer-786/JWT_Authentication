const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

// Middleware to verify the JWT token
const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["x-access-token"] || req.headers["authorization"];  // Checking both headers

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    // If the token starts with "Bearer ", remove that part
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length); // Remove "Bearer " part
    }

    // Verify the token
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;  // Attach user ID to request object
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

// Middleware to check if the user has Admin role
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    // Check user roles
    const roles = await Role.find({ _id: { $in: user.roles } }).exec();
    if (roles.some(role => role.name === "admin")) {
      return next();
    }

    return res.status(403).send({ message: "Require Admin Role!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Middleware to check if the user has Moderator role
const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    // Check user roles
    const roles = await Role.find({ _id: { $in: user.roles } }).exec();
    if (roles.some(role => role.name === "moderator")) {
      return next();
    }

    return res.status(403).send({ message: "Require Moderator Role!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Export the middlewares
const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};

module.exports = authJwt;
