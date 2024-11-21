// components/AppointmentDetails.js

import React, { useState } from 'react';
import axios from 'axios';

const AppointmentDetails = ({ doctorid, selectedSlot, onBack, selectedDate }) => {
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]); // Store multiple images

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files); // Convert FileList to array
        setImages(files); // Store the selected files
    };

    const handleBookAppointment = async () => {
        const token = localStorage.getItem('Authorization');
        const patientId = localStorage.getItem('Id');
        const doctorId = doctorid;

        // Create FormData to handle file upload
        const formData = new FormData();
        formData.append('patientId', patientId);
        formData.append('doctorId', doctorId);
        formData.append('timeSlot', selectedSlot);
        formData.append('date', selectedDate);
        formData.append('description', description);

        // Append each selected image to FormData
        images.forEach((image) => {
            formData.append('imagePath', image);
        });

        try {
            const response = await axios.post('http://localhost:2549/api/consultations/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                },
            });

            console.log('Appointment booked:', response.data);
            // Handle success (e.g., show success message or redirect)
        } catch (error) {
            console.error('Error booking appointment:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div>
            <h4>Confirm Appointment</h4>
            <p>Selected Date: {selectedDate}</p>
            <p>Selected Time Slot: {selectedSlot}</p>
            <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description (optional)"
            />
            <input 
                type="file"
                multiple // Allow multiple file selection
                onChange={handleImageChange}
                accept="image/*" // Restrict to image files
            />
            <button onClick={handleBookAppointment}>Book Appointment</button>
            <button onClick={onBack}>Back to Time Slots</button>
        </div>
    );
};

export default AppointmentDetails;
