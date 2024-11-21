import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Carousel } from 'react-bootstrap';

const ConsultationRequests = ({ requests = [], onBack, onConfirm, onComplete }) => {
  const [requestStatuses, setRequestStatuses] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);

  // Handle any button click (Accept, Reject, Complete)
  const handleStatusChange = async (requestId, status) => {
    try {
      const doctorId = localStorage.getItem('Id');
      const token = localStorage.getItem('Authorization');
      
      await axios.put(
        `http://localhost:2549/api/consultations/${requestId}/status`,
        { status: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setRequestStatuses((prevState) => ({
        ...prevState,
        [requestId]: status, 
      }));
      
      if (status === 'Accepted') {
        onConfirm(requestId);
      } else {
        onComplete(requestId);
      }
    } catch (error) {
      console.error('Error changing the request status:', error);
    }
  };

  // Function to safely parse imagePath field
  const parseImagePath = (imagePath) => {
    try {
      return JSON.parse(imagePath);
    } catch (error) {
      return imagePath ? [imagePath] : [];
    }
  };

  // Function to open modal with the carousel images
  const handleOpenModal = (imagePath) => {
    setCarouselImages(parseImagePath(imagePath));
    setShowModal(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h2>Consultation Requests</h2>
      {requests.length > 0 ? (
        <ul>
          {requests.map((request) => {
            const imagePaths = parseImagePath(request.imagePath);

            return (
              <li key={request.id}>
                <strong>Patient:</strong> {request.Patient.name} <br />
                <strong>Email:</strong> {request.Patient.email} <br />
                <strong>Status:</strong> {requestStatuses[request.id] || request.status} <br />
                <strong>Date :</strong> {new Date(request.date).toISOString().split('T')[0]} <br/>
                <strong>Time Slot:</strong> {request.timeSlot} <br />

                {/* Button to see images */}
                {imagePaths.length > 0 && (
                  <Button variant="link" onClick={() => handleOpenModal(request.imagePath)}>
                    See Images
                  </Button>
                )}

                {/* Show Accept or Reject Button if the request has not been accepted, rejected, or completed */}
                {requestStatuses[request.id] !== 'Accepted' && requestStatuses[request.id] !== 'Rejected' && requestStatuses[request.id] !== 'Completed' && (
                  <>
                    <Button onClick={() => handleStatusChange(request.id, 'Accepted')}>Accept</Button>
                    <Button onClick={() => handleStatusChange(request.id, 'Rejected')}>Reject</Button>
                  </>
                )}

                {/* Show Complete Button if the request has been accepted and not yet completed */}
                {requestStatuses[request.id] === 'Accepted' && requestStatuses[request.id] !== 'Completed' && (
                  <Button onClick={() => handleStatusChange(request.id, 'Completed')}>Complete</Button>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No consultation requests available.</p>
      )}
      <Button onClick={onBack}>Back</Button>

      {/* Modal to show the carousel with images */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Consultation Disease Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {carouselImages.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={`http://localhost:2549/${image}`}
                  alt={`Consultation Image ${index + 1}`}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
       
      </Modal>
    </div>
  );
};

export default ConsultationRequests;
