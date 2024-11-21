// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterDoctor from './components/RegisterDoctor';
import RegisterPatient from './components/RegisterPatient';
import Login from './components/Login';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import './App.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register-doctor" element={<RegisterDoctor />} />
                <Route path="/register-patient" element={<RegisterPatient />} />
                <Route path="/login" element={<Login />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/patient-dashboard" element={<PatientDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
