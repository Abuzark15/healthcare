import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPatient = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:2549/api/patients/register', formData);
            console.log('Patient registered:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error registering patient:', error);
        }
    };

    return (
        <div className="register-container">
            <div className="left-image"></div>
            <div className="right-content">
                <h2>Register as Patient</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button type="submit">Register</button>
                </form>
                <button onClick={() => navigate('/')}>Back</button>
            </div>
        </div>
    );
};

export default RegisterPatient;
