const JWT = require('jsonwebtoken');
const { secretKey } = require('../config/env');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  // Extract token from cookies or Authorization header
  const token =
    req.cookies.authToken || req.headers['authorization']?.split(' ')[1];

  // If no token is found, respond with unauthorized
  if (!token) {
    return res.status(401).json({ message: 'User unauthorized' });
  }

  console.log('Received token:', token); // Debugging: log the token

  try {
    // Verify the token using JWT secret
    const decodedToken = JWT.verify(token, secretKey);
    console.log('Decoded token:', decodedToken); // Debugging: log decoded token

    // Find the user from the decoded token
    const user = await User.findById(decodedToken.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user to request object for later use
    req.user = user;
    next();
  } catch (error) {
    console.log('Error in auth middleware:', error); // Debugging: log error
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
