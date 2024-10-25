import React from 'react';

const ConsultationRequests = ({ requests = [], onBack, onConfirm, onComplete }) => {
    return (
        <div className="consultation-requests-container">
            <h2>Consultation Requests</h2>
            {requests.length > 0 ? (
                <ul>
                    {requests.map((request) => (
                        <li key={request.id}>
                            <strong>Patient:</strong> {request.Patient.name} <br />
                            <strong>Email:</strong> {request.Patient.email} <br />
                            <strong>Status:</strong> {request.status} <br />
                            <strong>Time Slot:</strong> {request.timeSlot} <br />
                            <strong>Image:</strong> <img src={`http://localhost:2549/${request.imagePath}`} alt="Consultation" style={{ width: '100px', height: 'auto' }} />
                            
                            {/* Confirm Button */}
                            <button onClick={() => onConfirm(request.id)}>Confirm</button>
                            {/* Complete Button */}
                            <button onClick={() => onComplete(request.id)}>Complete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No consultation requests available.</p>
            )}
            <button onClick={onBack} style={{ marginTop: '20px' }}>Back</button>
        </div>
    );
};

export default ConsultationRequests;
