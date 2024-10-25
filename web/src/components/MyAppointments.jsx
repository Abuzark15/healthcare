// MyAppointments.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyAppointments = ({ onBack }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error handling

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        const token = localStorage.getItem('Authorization');
        const pateintId = localStorage.getItem('Id');
        try {
            const response = await axios.get(`http://localhost:2549/api/consultations/all/request/${pateintId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAppointments(response.data);
        } catch (error) {
            setError('Error fetching appointments.');
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading appointments...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>My Appointments</h2>
           
            {appointments.length === 0 ? (
                <p>No appointments scheduled.</p>
            ) : (
                appointments.map(appointment => (
                    <div key={appointment.id}>
                        <h3>Doctor Name :{appointment.Doctor.name}</h3>
                        <p>Specialization: {appointment.Doctor.specialization}</p>
                        <p>Status: {appointment.status}</p>
                        <p>Time Slot: {appointment.timeSlot || 'Not specified'}</p>
                        <img src={`http://localhost:2549/${appointment.imagePath}`} alt={appointment.Doctor.name} style={{ width: '50px', height: '50px' }} />
                    </div>
                ))
            )}
             <button onClick={onBack}>Back</button>
        </div>
    );
};

export default MyAppointments;
