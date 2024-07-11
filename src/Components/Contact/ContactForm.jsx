import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import './ContactForm.css';

const ContactForm = () => {
    const [contact, setContact] = useState({
        contactName: '',
        contactMob: '',
        contactEmail: '',
        contactDesc: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({
            ...contact,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9090/api/contact', contact)
            .then(response => {
                setSuccessMessage('Contact submitted successfully!');
                setErrorMessage('');
                setContact({
                    contactName: '',
                    contactMob: '',
                    contactEmail: '',
                    contactDesc: '',
                });
            })
            .catch(error => {
                setSuccessMessage('');
                setErrorMessage('There was an error submitting the contact form!');
                console.error('There was an error submitting the contact form!', error);
            });
    };

    return (
        <Container className="contact-form-container">
            <h1>Contact Us</h1>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="contactName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="contactName" 
                                value={contact.contactName} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="contactMob">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="contactMob" 
                                value={contact.contactMob} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="contactEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                name="contactEmail" 
                                value={contact.contactEmail} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="contactDesc">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="contactDesc" 
                        value={contact.contactDesc} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>
                <Button type="submit" className="mt-3">Submit</Button>
            </Form>
            {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
        </Container>
    );
};

export default ContactForm;
