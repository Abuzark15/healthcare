import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Carousel, Card } from 'react-bootstrap';

const MyAppointments = ({ onBack }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const [carouselImages, setCarouselImages] = useState([]); // Images for carousel

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        const token = localStorage.getItem('Authorization');
        const patientId = localStorage.getItem('Id');
        try {
            const response = await axios.get(`http://localhost:2549/api/consultations/all/request/${patientId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAppointments(response.data);
        } catch (error) {
            setError('Error fetching appointments.');
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    // Helper to parse imagePath field
    const parseImagePath = (imagePath) => {
        try {
            return JSON.parse(imagePath);
        } catch (error) {
            return imagePath ? [imagePath] : [];
        }
    };

    // Open modal with carousel images
    const handleOpenModal = (imagePath) => {
        setCarouselImages(parseImagePath(imagePath));
        setShowModal(true);
    };

    // Close the modal
    const handleCloseModal = () => {
        setShowModal(false);
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
                <div className="row">
                    {appointments.map((appointment) => {
                        const imagePaths = parseImagePath(appointment.imagePath);

                        return (
                            <div key={appointment.id} className="col-md-4 mb-4">
                                <Card className="shadow-sm">
                                    <Card.Body>
                                        <Card.Title>{appointment.Doctor.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {appointment.Doctor.specialization}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            <strong>Status:</strong> {appointment.status}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Time Slot:</strong> {appointment.timeSlot || 'Not specified'}
                                        </Card.Text>

                                        {/* See Images Button */}
                                        {imagePaths.length > 0 && (
                                            <Button
                                                variant="link"
                                                className="text-decoration-none"
                                                onClick={() => handleOpenModal(appointment.imagePath)}
                                            >
                                                See Images
                                            </Button>
                                        )}

                                        {/* Display the first image thumbnail (if available) */}
                                      
                                    </Card.Body>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            )}

            <Button variant="secondary" onClick={onBack}>Back</Button>

            {/* Modal with Carousel for images */}
            <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Consultation Images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {carouselImages.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    src={`http://localhost:2549/${image}`}
                                    alt={`Consultation Image ${index + 1}`}
                                    className="d-block w-100"
                                    style={{ height: 'auto' }}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Modal.Body>
               
            </Modal>
        </div>
    );
};

export default MyAppointments;
