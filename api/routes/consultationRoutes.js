const express = require('express');
const { requestConsultation, getConsultationsByPatient, updateConsultationStatus, getAllConsultationbypatient } = require('../controller/consultationController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const router = express.Router();

// Request a consultation
router.post('/', authMiddleware, upload.array('imagePath', 5), requestConsultation);

// Get consultations by patient ID
router.get('/:doctorId', authMiddleware, getConsultationsByPatient);

// Update consultation status by ID
router.put('/:id/status', authMiddleware, updateConsultationStatus);

router.get('/all/request/:patientId', getAllConsultationbypatient);

module.exports = router;
