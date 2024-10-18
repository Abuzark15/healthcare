const Consultation = require('../modals/Consultation');

// Request a consultation
const requestConsultation = async (req, res) => {
    const { patientId, doctorId } = req.body;
    const imagePath = req.body.path
    try {
        const consultation = await Consultation.create({ patientId, doctorId, imagePath });
        res.status(201).json(consultation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get consultations for a specific patient
const getConsultationsByPatient = async (req, res) => {
    const { patientId } = req.params;

    try {
        const consultations = await Consultation.findAll({ where: { patientId } });
        res.status(200).json(consultations);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update consultation status
const updateConsultationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        await Consultation.update({ status }, { where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json(error);
    }
};

// Additional functions (if needed) can be added here...

module.exports = {
    requestConsultation,
    getConsultationsByPatient,
    updateConsultationStatus,
};
