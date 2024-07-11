import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  const [loginRequest, setLoginRequest] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginRequest({ ...loginRequest, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const loginTimestamp = new Date().toISOString();
      const response = await axios.post('http://localhost:9090/api/login', { ...loginRequest, loginTimestamp });
      const { dashboardUrl, role, userId } = response.data; // assuming userId is returned

      // Store user information in local storage
      window.localStorage.setItem('userId', userId);
      window.localStorage.setItem('userEmail', loginRequest.email);
      window.localStorage.setItem('role', role);
      
      // Redirect based on role
      window.location.href = dashboardUrl;

    } catch (error) {
      alert('Error during login: ' + (error.response?.data || error.message));
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center login-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                placeholder="Enter email" 
                onChange={handleChange} 
                className="login-input"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                name="password" 
                placeholder="Password" 
                onChange={handleChange} 
                className="login-input"
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleLogin} className="w-100 login-button">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
