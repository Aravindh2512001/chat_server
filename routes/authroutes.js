const express = require('express');
const authRoutes = express.Router();
const { register,login ,logout,checkAuth} = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Define routes
authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/logout', logout);
authRoutes.get('/check-auth',authMiddleware, checkAuth);

module.exports = authRoutes;
