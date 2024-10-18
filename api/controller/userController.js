const  Patient  = require('../modals/Patient'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new patient
const registerPatient = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        

        // Create the patient with the hashed password
        const newPatient = await Patient.create({ name, email, password: hashedPassword }); // Use the hashed password
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login a patient
const loginPatient = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    
    const patient = await Patient.findOne({ where: { email } });

    if (!patient) {
        return res.status(404).json({ message: 'User not found.' });
    }
    console.log(patient.password);
    const isMatch = await bcrypt.compare(password, patient.password);
    console.log(isMatch);
    
    console.log(isMatch);
    

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password.' });
    }

    const token = jwt.sign({ id: patient.id }, 'abuzar', { expiresIn: '1h' });
    res.json({ token });
};

// Additional functions (if needed) can be added here...

module.exports = {
    registerPatient,
    loginPatient,
};
