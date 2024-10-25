import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MakeAppointment from './MakeAppointment';
import MyAppointments from './MyAppointments';

const PatientDashboard = () => {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState('');
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        const token = localStorage.getItem('Authorization');
        try {
            const response = await axios.get('http://localhost:2549/api/doctors/getall', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleMakeAppointment = () => {
        setCurrentView(currentView === 'make' ? '' : 'make');
    };

    const handleMyAppointments = () => {
        setCurrentView(currentView === 'myAppointments' ? '' : 'myAppointments');
    };

    const handlelogout = () =>{
        localStorage.setItem('Authorization', null);
        localStorage.setItem('Id', null);
        navigate('/');
    }

    return (
        <div>
            <h1>Patient Dashboard</h1>
            <button onClick={() => navigate('/')}>Logout</button>
            <button onClick={handleMakeAppointment}>Make an Appointment</button>
            <button onClick={handleMyAppointments}>My Appointments</button>

            {currentView === 'make' && 
                <MakeAppointment doctors={doctors} onBack={handleMakeAppointment} />
            }

            {currentView === 'myAppointments' && 
                <MyAppointments onBack={handleMyAppointments} />
            }
        </div>
    );
};

export default PatientDashboard;
