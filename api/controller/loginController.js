const Doctor = require('../modals/Doctor'); 
const Patient = require('../modals/Patient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'abuzar'; 

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check in the Patient model
        let user = await Patient.findOne({ where: { email } });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({ id: user.id, role: 'patient' }, JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ token, user });
            }
        }

        // Check in the Doctor model
        user = await Doctor.findOne({ where: { email } });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({ id: user.id, role: 'doctor' }, JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ token, user });
            }
        }

        return res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = login;
