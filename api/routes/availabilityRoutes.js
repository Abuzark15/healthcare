const express = require('express');
const { createAvailability, getAvailabilityByDoctor, deleteAvailability } = require('../controller/availabilityController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create availability
router.post('/create', authMiddleware, createAvailability);

// Get availability by doctor ID
router.get('/get/:doctorId', authMiddleware, getAvailabilityByDoctor);

// Delete availability by ID
router.delete('/delete/:id', authMiddleware, deleteAvailability);

module.exports = router;
