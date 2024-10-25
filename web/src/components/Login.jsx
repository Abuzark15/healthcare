import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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
            const response = await axios.post('http://localhost:2549/api/common/login', formData);
            console.log(response.data);
        
            if (response.status === 200) {
                localStorage.setItem('Authorization', response.data.token);
                localStorage.setItem('Id', response.data.user.id);
                console.log('Login successful, navigating to home...');
                
                if (response.data.user.specialization) {
                    navigate('/doctor-dashboard');
                } else {
                    navigate('/patient-dashboard');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="left-image"></div>
            <div className="right-content">
                <h2>Login to Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button type="submit">Login</button>
                </form>
                <button onClick={() => navigate('/')}>Back</button>
            </div>
        </div>
    );
};

export default Login;
