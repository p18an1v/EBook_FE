import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import './Register.css';

const Register = () => {
  const [user, setUser] = useState({
    fullName: '',
    mobile: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async () => {
    if (user.password !== user.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }
    try {
      const response = await axios.post('http://localhost:9090/api/register', user);
      alert(response.data);
      setOtpSent(true);
      setPasswordMismatch(false);
    } catch (error) {
      alert('Error during registration: ' + (error.response?.data || error.message));
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:9090/api/verify-registration-otp', {
        email: user.email,
        otp: parseInt(otp, 10),
      });
      alert(response.data);
      if (response.status === 200 && response.data === 'User registration completed successfully.') {
        navigate('/login'); // Redirect to login page
      }
    } catch (error) {
      alert('Error during OTP verification: ' + (error.response?.data || error.message));
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center register-container">
      <Card className="register-card">
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text" 
                name="fullName" 
                placeholder="Full Name" 
                onChange={handleChange} 
                className="register-input"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control 
                type="text" 
                name="mobile" 
                placeholder="Mobile" 
                onChange={handleChange} 
                className="register-input"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                placeholder="Email" 
                onChange={handleChange} 
                className="register-input"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                name="username" 
                placeholder="Username" 
                onChange={handleChange} 
                className="register-input"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                name="password" 
                placeholder="Password" 
                onChange={handleChange} 
                className="register-input"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                type="password" 
                name="confirmPassword" 
                placeholder="Confirm Password" 
                onChange={handleChange} 
                className="register-input"
              />
            </Form.Group>

            {passwordMismatch && <Alert variant="danger">Passwords do not match!</Alert>}

            <Button variant="primary" type="button" onClick={handleRegister} className="w-100 register-button">
              Register
            </Button>
          </Form>

          {otpSent && (
            <div className="otp-section mt-4">
              <h3 className="text-center mb-4">Verify OTP</h3>
              <Form.Group className="mb-3" controlId="formOtp">
                <Form.Label>OTP</Form.Label>
                <Form.Control 
                  type="text" 
                  name="otp" 
                  placeholder="Enter OTP" 
                  onChange={handleOtpChange} 
                  className="register-input"
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={handleVerifyOtp} className="w-100 register-button">
                Verify OTP
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;


