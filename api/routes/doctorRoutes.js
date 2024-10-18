const express = require('express');
const upload = require('../middleware/multer');
const { registerDoctor, loginDoctor } = require('../controller/doctorController');
const router = express.Router();

// Doctor registration
router.post('/register', upload.single('profilePhoto'), registerDoctor);

// Doctor login
router.post('/login', loginDoctor);

module.exports = router;
