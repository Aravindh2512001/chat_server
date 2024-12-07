const express = require('express');
const { profileUpdate, getUsers } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const userRoutes = express.Router();

// Get all users (authentication required)
userRoutes.get('/', authMiddleware, getUsers);

// Update user profile (authentication required)
userRoutes.put('/profile-update/:id', authMiddleware, profileUpdate);

module.exports = userRoutes;
