import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Availability from './Availability';
import ConsultationRequests from './ConsultationRequests'; 

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [availabilityList, setAvailabilityList] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activeSection, setActiveSection] = useState(''); // New state to track which section is active

  // Fetch availability from the backend
  const fetchAvailability = async () => {
    const doctorId = localStorage.getItem('Id');
    const token = localStorage.getItem('Authorization');

    if (!doctorId) {
      console.error('Doctor ID not found');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:2549/api/availability/get/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvailabilityList(response.data);
      console.log(response);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const handleAddAvailability = async (newSlot) => {
    const doctorId = localStorage.getItem('Id');
    const token = localStorage.getItem('Authorization');

    try {
      await axios.post(
        `http://localhost:2549/api/availability/create/`,
        newSlot,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAvailability();
    } catch (error) {
      console.error('Error adding availability:', error);
    }
  };

  const handleEditAvailability = async (slot) => {
    // Logic to edit the availability slot (e.g., show a form to edit)
    console.log('Edit Slot:', slot);
  };

  const handleDeleteAvailability = async (date) => {
    const doctorId = localStorage.getItem('Id');
    const token = localStorage.getItem('Authorization');

    try {
      await axios.delete(`http://localhost:2549/api/availability/${doctorId}?date=${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAvailability();
    } catch (error) {
      console.error('Error deleting availability:', error);
    }
  };

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
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(response.data);
      setActiveSection('requests'); // Set the active section to 'requests'
    } catch (error) {
      console.error('Error fetching consultation requests:', error);
    }
  };

  const handleLogout = () => {
    localStorage.setItem('Authorization', null);
    localStorage.setItem('Id', null);
    navigate('/');
  };

  const handleCheckAvailability = () => {
    fetchAvailability();
    setActiveSection('availability'); // Set the active section to 'availability'
  };

  return (
    <div className="dashboard-container">
      <h1>Doctor Dashboard</h1>
      <button onClick={handleCheckRequests}>Check Consultation Requests</button>
      <button onClick={handleCheckAvailability}>Check Availability</button>
      <button onClick={handleLogout}>Logout</button>

      {/* Conditional rendering based on activeSection */}
      {activeSection === 'requests' && <ConsultationRequests requests={requests} />}
      {activeSection === 'availability' && (
        <Availability
          availabilityList={availabilityList}
          onAdd={handleAddAvailability}
          onEdit={handleEditAvailability}
          onDelete={handleDeleteAvailability}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;
