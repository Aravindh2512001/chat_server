const JWT = require("jsonwebtoken");
const { secretKey } = require("../config/env");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token =
  req.cookies.authToken || req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "User unauthorized" });
  }
  console.log("token",token)
  try {
    const decodedToken = JWT.verify(token, secretKey);
    const user = await User.findById(decodedToken.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in auth middleware", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
