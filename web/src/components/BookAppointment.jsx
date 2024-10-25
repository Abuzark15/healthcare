import React, { useState } from 'react';
import axios from 'axios';
import AppointmentDetails from './AppointmentDetails'; // Import the new component


const BookAppointment = ({ doctorId, onBack }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const fetchTimeSlots = async (date) => {
        const token = localStorage.getItem('Authorization');
        try {
            const response = await axios.get(`http://localhost:2549/api/availability/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const availableSlots = response.data.filter(slot => {
                const slotDate = new Date(slot.date).toISOString().split('T')[0];
                return slotDate === date; 
            }).map(slot => `${slot.startTime} - ${slot.endTime}`);

            setTimeSlots(availableSlots);

            if (availableSlots.length === 0) {
                setErrorMessage('Doctor is not available on this date.');
            } else {
                setErrorMessage('');
            }
        } catch (error) {
            console.error('Error fetching time slots:', error);
            setErrorMessage('An error occurred while fetching availability.');
        }
    };

    const handleDateSubmit = (event) => {
        event.preventDefault();
        if (selectedDate) {
            fetchTimeSlots(selectedDate);
        }
    };
 
    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
    };

    const handleBackToSlots = () => {
        setSelectedSlot(null);
        setTimeSlots([]); 
    };

    const handleClose = () => {
        onBack(); // Call onBack to close the modal
    };

    return (
        <>
            <div className="book-appointment-overlay" onClick={onBack}></div>
            <div className="book-appointment-modal">
                <span className="close-icon" onClick={handleClose}>
                    &times; {/* X character */}
                </span>
                {!selectedSlot ? (
                    <>
                        <h4>Select a Date</h4>
                        <form onSubmit={handleDateSubmit}>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                min={new Date().toISOString().split('T')[0]} 
                            />
                            <button type="submit">Check Availability</button>
                        </form>

                        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

                        {timeSlots.length > 0 && (
                            <div>
                                <h4>Available Time Slots</h4>
                                <ul>
                                    {timeSlots.map((slot) => (
                                        <li 
                                            key={slot} 
                                            onClick={() => handleSlotSelection(slot)} 
                                            style={{ 
                                                cursor: 'pointer', 
                                                backgroundColor: selectedSlot === slot ? '#d3d3d3' : 'transparent',
                                                padding: '5px',
                                                margin: '5px 0',
                                                border: '1px solid #ccc',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            {slot}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Removed the back button */}
                    </>
                ) : (
                    <AppointmentDetails doctorid={doctorId} selectedSlot={selectedSlot} onBack={handleBackToSlots} />
                )}
            </div>
        </>
    );
};

export default BookAppointment;
