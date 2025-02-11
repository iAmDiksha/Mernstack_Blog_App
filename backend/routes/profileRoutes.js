// routes/ProfileRoute.js
const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware'); // Your JWT auth middleware

const router = express.Router();

// GET /api/user/profile - Fetch user profile
router.get('/profile', authMiddleware, getProfile);

// PUT /api/user/profile - Update user profile
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
