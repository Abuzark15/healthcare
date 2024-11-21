import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterDoctor = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        email: '',
        password: '',
        profilePhoto: null,
    });
    const [isVerified, setIsVerified] = useState(false);
    const [emailStatus, setEmailStatus] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const emailFromUrl = urlParams.get('email');

    // Persist form data if it exists in localStorage
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('registerDoctorFormData'));
        if (savedData) {
            setFormData(savedData);
        }

        if (token && emailFromUrl) {
            axios
              .get(`http://localhost:2549/api/doctors/verify-email?token=${token}&email=${emailFromUrl}`)
              .then((response) => {
                setIsVerified(true);
                setSuccessMessage(response.data);
              })
              .catch((error) => {
                setVerificationError('Invalid or expired token');
              });
          }

        // Pre-fill email if provided in the URL
        if (emailFromUrl) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                email: emailFromUrl,
            }));
        }
    }, [token, emailFromUrl]);

    // Handle form data changes and save to localStorage
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };
        setFormData(updatedData);

        // Save form data to localStorage
        localStorage.setItem('registerDoctorFormData', JSON.stringify(updatedData));
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePhoto: e.target.files[0] });
    };

    const sendVerificationEmail = async () => {
        try {
            await axios.post('http://localhost:2549/api/doctors/send-verification', { email: formData.email });
            setEmailStatus('');
            setVerificationSent(true);
            setSuccessMessage('Verification email sent! Please check your inbox.');
        } catch (error) {
            console.error('Error sending verification email:', error);
            setErrorMessage('Failed to send verification email. Please try again later.');
            setEmailStatus('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isVerified) {
            setErrorMessage('Please verify your email first.');
            return;
        }

        if (isVerified) {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('specialization', formData.specialization);
            data.append('email', formData.email);
            data.append('password', formData.password);
            data.append('profilePhoto', formData.profilePhoto);

            try {
                const response = await axios.post('http://localhost:2549/api/doctors/register', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log('Doctor registered:', response.data);
                setSuccessMessage('Doctor registered successfully!');
                localStorage.removeItem('registerDoctorFormData'); // Clear localStorage on successful registration
                navigate('/');
            } catch (error) {
                console.error('Error registering doctor:', error);
                setErrorMessage('Error registering doctor. Please try again later.');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="left-image"></div>
            <div className="right-content">
                <h2>Register as Doctor</h2>
                
                {/* Display success or error messages */}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="specialization"
                        placeholder="Specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {emailStatus && <p style={{ color: 'red' }}>{emailStatus}</p>}
                    <button type="button" onClick={sendVerificationEmail}>
                        Verify Email
                    </button>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="file"
                        name="profilePhoto"
                        onChange={handleFileChange}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
                <button onClick={() => navigate('/')}>Back</button>
            </div>
        </div>
    );
};

export default RegisterDoctor;
