import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConsultationRequests from './ConsultationRequests'; 

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [showRequests, setShowRequests] = useState(false);

    const handleCheckRequests = async () => {
        const doctorId = localStorage.getItem('Id');
        const token = localStorage.getItem('Authorization');

        if (!doctorId) {
            console.error('Doctor ID not found');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:2549/api/consultations/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRequests(response.data);
            setShowRequests(true);
        } catch (error) {
            console.error('Error fetching consultation requests:', error);
        }
    };

    const handleUpdateStatus = async (requestId, newStatus) => {
        const token = localStorage.getItem('Authorization');

        try {
            await axios.put(`http://localhost:2549/api/consultations/${requestId}/status`, { status: newStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(`Updated request ID: ${requestId} to status: ${newStatus}`);
            handleCheckRequests();
        } catch (error) {
            console.error('Error updating request status:', error);
        }
    };

    const handleConfirm = (requestId) => {
        handleUpdateStatus(requestId, 'Confirmed');
    };

    const handleComplete = (requestId) => {
        handleUpdateStatus(requestId, 'Completed');
    };
    const handlelogout = () =>{
        localStorage.setItem('Authorization', null);
        localStorage.setItem('Id', null)
        navigate('/')
    }

    return (
        <div className="dashboard-container">
            <h1>Doctor Dashboard</h1>
            <button onClick={handleCheckRequests}>Check Consultation Requests</button>
            <button onClick={() => console.log('Checking availability...')}>Check Availability</button>
            <button onClick={handlelogout}>Logout</button>

            {showRequests && 
                <ConsultationRequests 
                    requests={requests} 
                    onBack={() => setShowRequests(false)} 
                    onConfirm={handleConfirm} 
                    onComplete={handleComplete} 
                />
            }
        </div>
    );
};

export default DoctorDashboard;
