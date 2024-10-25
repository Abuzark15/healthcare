import React from 'react';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <h1>Welcome to the Skincare Consultation Platform</h1>
            <button onClick={() => navigate('/register-doctor')}>Register as Doctor</button>
            <button onClick={() => navigate('/register-patient')}>Register as Patient</button>
            <button onClick={() => navigate('/login')}>Login</button>
        </div>
    );
};

export default LandingPage;
