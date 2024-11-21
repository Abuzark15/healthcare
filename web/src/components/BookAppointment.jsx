import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentDetails from './AppointmentDetails'; // Import the new component

const BookAppointment = ({ doctorId, onBack }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date()); // Initialize current time
    const [slotStatuses, setSlotStatuses] = useState({}); // Store status of each slot

    // Update current time every minute to keep it accurate
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    // Function to parse a time string and return a Date object (for comparison)
    const parseTime = (timeStr, date) => {
        const [hours, minutes] = timeStr.split(':').map(Number);

        // Create a Date object for the parsed time, based on the selected date
        const parsedDate = new Date(date);
        parsedDate.setHours(hours, minutes, 0, 0);
        return parsedDate;
    };

    // Function to generate available time slots
    const generateTimeSlots = (startTime, endTime, date) => {
        const slots = [];
        let currentStart = parseTime(startTime, date);
        let currentEnd = parseTime(endTime, date);

        // Only add slots that are in the future compared to the current time
        while (currentStart < currentEnd) {
            let nextStart = new Date(currentStart);
            let nextEnd = new Date(currentStart);
            nextEnd.setMinutes(currentStart.getMinutes() + 30);

            // Compare the slot start time with current time
            if (nextStart >= currentTime) {
                const startStr = nextStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                const endStr = nextEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                slots.push(`${startStr} - ${endStr}`);
            }
            currentStart = nextEnd;
        }

        return slots;
    };

    // Function to fetch status of the time slots
    const fetchSlotStatuses = async (date) => {
        const token = localStorage.getItem('Authorization');
        try {
            const response = await axios.get(`http://localhost:2549/api/consultations/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Store the statuses of slots by date
            const slotStatusMap = response.data.reduce((acc, slot) => {
                const slotDate = new Date(slot.date).toISOString().split('T')[0];
                if (slotDate === date) {
                    const timeSlot = slot.timeSlot; // Assuming the time is in `slot.timeSlot`
                    acc[timeSlot] = slot.status; // { timeSlot: status }
                }
                return acc;
            }, {});

            setSlotStatuses(slotStatusMap);
        } catch (error) {
            console.error('Error fetching slot statuses:', error);
            setErrorMessage('An error occurred while fetching appointment statuses.');
        }
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const fetchTimeSlots = async (date) => {
        const token = localStorage.getItem('Authorization');
        try {
            const response = await axios.get(`http://localhost:2549/api/availability/get/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const availableSlots = response.data.filter(slot => {
                const slotDate = new Date(slot.date).toISOString().split('T')[0];
                return slotDate === date;
            }).map(slot => {
                return generateTimeSlots(slot.startTime, slot.endTime, date);
            }).flat();

            setTimeSlots(availableSlots);

            // Fetch status for the selected date after fetching the slots
            fetchSlotStatuses(date);

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
        // Only allow slot selection if it's not reserved
        if (!isSlotDisabled(slot)) {
            setSelectedSlot(slot);
        }
    };

    const handleBackToSlots = () => {
        setSelectedSlot(null);
        setTimeSlots([]);
    };

    const handleClose = () => {
        onBack();
    };

    // Check if a slot is disabled based on its status
    const isSlotDisabled = (slot) => {
        const slotStatus = slotStatuses[slot];
        return slotStatus === 'Pending' || slotStatus === 'Accepted';
    };

    return (
        <>
            <div className="book-appointment-overlay" onClick={onBack}></div>
            <div className="book-appointment-modal">
                <span className="close-icon" onClick={handleClose}>
                    &times;
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

                        {errorMessage && <div className="error-message">{errorMessage}</div>}

                        {timeSlots.length > 0 && (
                            <div>
                                <h4>Available Time Slots</h4>
                                <ul>
                                    {timeSlots.map((slot) => (
                                        <li
                                            key={slot}
                                            onClick={() => handleSlotSelection(slot)}
                                            className={selectedSlot === slot ? 'selected' : ''}
                                            style={{
                                                cursor: isSlotDisabled(slot) ? 'not-allowed' : 'pointer',
                                                color: isSlotDisabled(slot) ? 'gray' : 'black',
                                                textDecoration: isSlotDisabled(slot) ? 'line-through' : 'none',
                                            }}
                                        >
                                            {slot}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                ) : (
                    <AppointmentDetails 
                        doctorid={doctorId} 
                        selectedSlot={selectedSlot} 
                        selectedDate={selectedDate}
                        onBack={handleBackToSlots} 
                    />
                )}
            </div>
        </>
    );
};

export default BookAppointment;
