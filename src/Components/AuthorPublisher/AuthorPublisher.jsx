import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Container } from "react-bootstrap";
import AddAuthor from "../AuthorPublisher/AddAuthor";
import AddPublisher from "../AuthorPublisher/AddPublisher";
import EditAuthor from "../AuthorPublisher/EditAuthor";
import EditPublisher from "../AuthorPublisher/EditPublisher";
import "./AuthorPublisher.css";

const AuthorPublisher = ({ onSwitchToBook }) => {
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [isAddingAuthor, setIsAddingAuthor] = useState(false);
  const [isAddingPublisher, setIsAddingPublisher] = useState(false);
  const [isEditingAuthor, setIsEditingAuthor] = useState(false);
  const [isEditingPublisher, setIsEditingPublisher] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedPublisher, setSelectedPublisher] = useState(null);

  useEffect(() => {
    fetchAuthors();
    fetchPublishers();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/authors");
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchPublishers = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/publishers");
      setPublishers(response.data);
    } catch (error) {
      console.error("Error fetching publishers:", error);
    }
  };

  const handleAddAuthor = async (author) => {
    try {
      await axios.post("http://localhost:9090/api/authors", author);
      fetchAuthors();
      setIsAddingAuthor(false);
    } catch (error) {
      console.error("Error adding author:", error);
    }
  };

  const handleAddPublisher = async (publisher) => {
    try {
      await axios.post("http://localhost:9090/api/publishers", publisher);
      fetchPublishers();
      setIsAddingPublisher(false);
    } catch (error) {
      console.error("Error adding publisher:", error);
    }
  };

  const handleUpdateAuthor = async (updatedAuthor) => {
    try {
      await axios.put(`http://localhost:9090/api/authors/${updatedAuthor.authorId}`, updatedAuthor);
      fetchAuthors();
      setIsEditingAuthor(false);
      setSelectedAuthor(null);
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  const handleUpdatePublisher = async (updatedPublisher) => {
    try {
      await axios.put(`http://localhost:9090/api/publishers/${updatedPublisher.publisherId}`, updatedPublisher);
      fetchPublishers();
      setIsEditingPublisher(false);
      setSelectedPublisher(null);
    } catch (error) {
      console.error("Error updating publisher:", error);
    }
  };

  const handleDeleteAuthor = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/api/authors/${id}`);
      fetchAuthors();
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  const handleDeletePublisher = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/api/publishers/${id}`);
      fetchPublishers();
    } catch (error) {
      console.error("Error deleting publisher:", error);
    }
  };

  const handleEditAuthorClick = (author) => {
    setSelectedAuthor(author);
    setIsEditingAuthor(true);
  };

  const handleEditPublisherClick = (publisher) => {
    setSelectedPublisher(publisher);
    setIsEditingPublisher(true);
  };

  return (
    <div className="full-page-container">
      <Container className="content-container">
        <h2 className="text-center mt-4">Author and Publisher Management</h2>
        <div className="text-center d-flex justify-content-center btn-lg">
          <Button variant="primary" onClick={onSwitchToBook} className="me-2 btn-sm">Back to Books</Button>
          <Button variant="success" onClick={() => setIsAddingAuthor(true)} className="me-3">Add   Author</Button>
          <Button variant="success" onClick={() => setIsAddingPublisher(true)} className="me-2 btn-sm">Add Publisher</Button>
        </div>
        
        <h3>Authors</h3>
        <div className="table-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Author ID</th>
                <th>Author Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.authorId}>
                  <td>{author.authorId}</td>
                  <td>{author.authorName}</td>
                  <td>
                    <Button variant="warning" size="btn-sm" onClick={() => handleEditAuthorClick(author)} className="me-2">Edit</Button>
                    <Button variant="danger" size="btn-sm" onClick={() => handleDeleteAuthor(author.authorId)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <h3>Publishers</h3>
        <div className="table-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Publisher ID</th>
                <th>Publisher Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {publishers.map((publisher) => (
                <tr key={publisher.publisherId}>
                  <td>{publisher.publisherId}</td>
                  <td>{publisher.publisherName}</td>
                  <td>
                    <Button variant="warning" size="btn-sm" onClick={() => handleEditPublisherClick(publisher)} className="me-2">Edit</Button>
                    <Button variant="danger" size="btn-sm" onClick={() => handleDeletePublisher(publisher.publisherId)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>

      <Modal show={isAddingAuthor} onHide={() => setIsAddingAuthor(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddAuthor onSubmit={handleAddAuthor} onClose={() => setIsAddingAuthor(false)} />
        </Modal.Body>
      </Modal>

      <Modal show={isAddingPublisher} onHide={() => setIsAddingPublisher(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Publisher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPublisher onSubmit={handleAddPublisher} onClose={() => setIsAddingPublisher(false)} />
        </Modal.Body>
      </Modal>

      <Modal show={isEditingAuthor} onHide={() => setIsEditingAuthor(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditAuthor author={selectedAuthor} onSubmit={handleUpdateAuthor} onClose={() => setIsEditingAuthor(false)} />
        </Modal.Body>
      </Modal>

      <Modal show={isEditingPublisher} onHide={() => setIsEditingPublisher(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Publisher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPublisher publisher={selectedPublisher} onSubmit={handleUpdatePublisher} onClose={() => setIsEditingPublisher(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AuthorPublisher;
