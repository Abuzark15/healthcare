const express = require('express');
const { registerPatient, loginPatient } = require('../controller/userController');
const router = express.Router();

// Patient registration
router.post('/register', registerPatient);

// Patient login
router.post('/login', loginPatient);

module.exports = router;
