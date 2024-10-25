import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterDoctor = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        email: '',
        password: '',
        profilePhoto: null,
    });
    const [emailStatus, setEmailStatus] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePhoto: e.target.files[0] });
    };

    const sendVerificationEmail = async () => {
        try {
            await axios.post('http://localhost:2549/api/doctors/send-verification', { email: formData.email });
            setEmailStatus('Verification email sent!');
            setVerificationSent(true);
        } catch (error) {
            console.error('Error sending verification email:', error);
            setEmailStatus('Failed to send verification email.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!verificationSent) {
            setEmailStatus('Please verify your email first.');
            return;
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('specialization', formData.specialization);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('profilePhoto', formData.profilePhoto);

        try {
            const response = await axios.post('http://localhost:2549/api/doctors/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Doctor registered:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error registering doctor:', error);
        }
    };

    return (
        <div className="register-container">
            <div className="left-image"></div>
            <div className="right-content">
                <h2>Register as Doctor</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                    <input type="text" name="specialization" placeholder="Specialization" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    {emailStatus && <p style={{ color: 'red' }}>{emailStatus}</p>}
                    <button type="button" onClick={sendVerificationEmail}>Verify Email</button>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <input type="file" name="profilePhoto" onChange={handleFileChange} required />
                    <button type="submit">Register</button>
                </form>
                <button onClick={() => navigate('/')}>Back</button>
            </div>
        </div>
    );
};

export default RegisterDoctor;
