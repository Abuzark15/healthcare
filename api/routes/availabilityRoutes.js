const express = require('express');
const { createAvailability, getAvailabilityByDoctor, deleteAvailability } = require('../controller/availabilityController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create availability
router.post('/', authMiddleware, createAvailability);

// Get availability by doctor ID
router.get('/:doctorId', authMiddleware, getAvailabilityByDoctor);

// Delete availability by ID
router.delete('/:id', authMiddleware, deleteAvailability);

module.exports = router;
