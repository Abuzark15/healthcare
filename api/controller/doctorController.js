const Doctor  = require('../modals/Doctor'); // Ensure the correct path to the model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new doctor
const registerDoctor = async (req, res) => {
    const { name, specialization, email, password } = req.body;
    console.log(req.body);
    
    const profilePhoto = req.file.path; // Ensure image is uploaded
    console.log(profilePhoto);
    

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the doctor with the hashed password
        const newDoctor = await Doctor.create({
            name,
            specialization,
            email,
            password: hashedPassword, // Use the hashed password
            profilePhoto
        });

        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login a doctor
const loginDoctor = async (req, res) => {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ where: { email } });

    if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found.' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password.' });
    }

    const token = jwt.sign({ id: doctor.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

// Additional functions (if needed) can be added here...

module.exports = {
    registerDoctor,
    loginDoctor,
};
