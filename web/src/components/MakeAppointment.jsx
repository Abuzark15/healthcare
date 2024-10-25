import React, { useState } from 'react';
import BookAppointment from './BookAppointment';

const MakeAppointment = ({ doctors, onBack }) => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const handleViewProfile = (doctorId) => {
        console.log(`Viewing profile for doctor ID: ${doctorId}`);
    };

    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
    };

    return (
        <div className="make-appointment-container">
            <h2>Make an Appointment</h2>
            <p>Select a clinic and a doctor.</p>

            <div>
                {doctors.map((doctor) => (
                    <div key={doctor.email} className="doctor-card">
                        <div className="doctor-info">
                            {doctor.profilePhoto && (
                                <img 
                                    src={`http://localhost:2549/${doctor.profilePhoto}`} 
                                    alt={`${doctor.name}'s profile`} 
                                    className="doctor-photo" 
                                />
                            )}
                            <div className="doctor-details">
                                <h3>{doctor.name}</h3>
                                <p>Specialization: {doctor.specialization}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => handleViewProfile(doctor.id)}>View Profile</button>
                            <button onClick={() => handleBookAppointment(doctor)}>Book Appointment</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedDoctor && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Booking with {selectedDoctor.name}</h3>
                    <BookAppointment doctorId={selectedDoctor.id} onBack={() => setSelectedDoctor(null)} />
                </div>
            )}

            <button onClick={onBack}>Back to Dashboard</button>
        </div>
    );
};

export default MakeAppointment;
