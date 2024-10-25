// routes/doctorRoutes.js
const express = require('express');
const upload = require('../middleware/multer');
const { registerDoctor, loginDoctor, getalldoctors, sendVerificationEmail, verifyEmail } = require('../controller/doctorController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Doctor registration
router.post('/register', upload.single('profilePhoto'), registerDoctor);

// Doctor login
router.post('/login', loginDoctor);

// Get all doctors
router.get('/getall', authMiddleware, getalldoctors);

// Send verification email
router.post('/send-verification', sendVerificationEmail);

// Verify email
router.get('/verify-email', verifyEmail);

module.exports = router;
