import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // React Icons
import './Availability.css'; // Optional, for styling

const Availability = ({ availabilityList, onAdd, onEdit, onDelete }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSlot, setNewSlot] = useState({
    doctorId: '', 
    date: '',
    startTime: '',
    endTime: '',
  });

  // Retrieve the doctorId from localStorage when the component mounts
  useEffect(() => {
    const doctorId = localStorage.getItem('Id'); // Get doctorId from localStorage
    if (doctorId) {
      setNewSlot(prevState => ({ ...prevState, doctorId })); // Set doctorId to newSlot
    } else {
      console.error('Doctor ID not found in localStorage');
    }
  }, []);

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSlot({ ...newSlot, [name]: value });
  };

  const handleCreateSlot = () => {
    if (newSlot.date && newSlot.startTime && newSlot.endTime) {
      onAdd(newSlot);
      setNewSlot({ date: '', startTime: '', endTime: '', doctorId: newSlot.doctorId });
      setShowCreateForm(false);
    } else {
      alert('Please fill all fields.');
    }
  };

  return (
    <div className="availability-container">
      <div className="header">
        <h2>Availability</h2>
        <button className="create-btn" onClick={toggleCreateForm}>
          <FaPlus />
        </button>
      </div>

      {/* Modal/Pop-up form */}
      {showCreateForm && (
        <div className="modal-overlay" onClick={toggleCreateForm}>
          <div className="create-form" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Slot</h3>
            <div>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={newSlot.date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Start Time:</label>
              <input
                type="time"
                name="startTime"
                value={newSlot.startTime}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>End Time:</label>
              <input
                type="time"
                name="endTime"
                value={newSlot.endTime}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={handleCreateSlot}>Save Slot</button>
            <button onClick={toggleCreateForm} className="close-btn">
              X
            </button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {availabilityList.map((slot, index) => (
            <tr key={index}>
              <td>{new Date(slot.date).toISOString().split('T')[0]}</td>
              <td>{slot.startTime}</td>
              <td>{slot.endTime}</td>
              <td>
                <button onClick={() => onEdit(slot)}><FaEdit /></button>
                <button onClick={() => onDelete(slot.date)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Availability;
