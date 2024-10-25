// AppointmentDetails.js
import React, { useState } from 'react';
import axios from 'axios';

const AppointmentDetails = ({ doctorid, selectedSlot, onBack }) => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]); 
    };

    const handleBookAppointment = async () => {
        const token = localStorage.getItem('Authorization');
        const id = localStorage.getItem('Id')
        const patientId = id;
        const doctorId = doctorid;

        // Create FormData to handle file upload
        const formData = new FormData();
        formData.append('patientId', patientId);
        formData.append('doctorId', doctorId);
        formData.append('timeSlot', selectedSlot);
        formData.append('description', description);
        if (image) {
            formData.append('imagePath', image); // Append the image file
        }

        try {
            const response = await axios.post('http://localhost:2549/api/consultations/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                },
            });

            console.log('Appointment booked:', response.data);
            // Handle success (e.g., show a success message or redirect)
        } catch (error) {
            console.error('Error booking appointment:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div>
            <h4>Confirm Appointment</h4>
            <p>Selected Time Slot: {selectedSlot}</p>
            <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description (optional)"
            />
            <input 
                type="file"
                onChange={handleImageChange}
               // accept="image/*" // Limit file type to images
            />
            <button onClick={handleBookAppointment}>Book Appointment</button>
            <button onClick={onBack}>Back to Time Slots</button>
        </div>
    );
};

export default AppointmentDetails;
