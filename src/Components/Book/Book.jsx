import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import AddBook from '../AddBook/AddBook';
import AuthorPublisher from '../AuthorPublisher/AuthorPublisher';
import './Book.css';

const Book = () => {
  const [books, setBooks] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isAuthorPublisherView, setIsAuthorPublisherView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [updateFormData, setUpdateFormData] = useState({
    bookId: "",
    bookTitle: "",
    totalCount: 0,
    publishingDate: "",
    price: 0.0,
    imgUrl: ""
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/publishers");
      const updatedBooks = parsePublishersResponse(response.data);
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const parsePublishersResponse = (publishers) => {
    let parsedBooks = [];
    publishers.forEach((publisher) => {
      publisher.authors.forEach((author) => {
        author.books.forEach((book) => {
          parsedBooks.push({
            publisherId: publisher.publisherId,
            publisherName: publisher.publisherName,
            authorId: author.authorId,
            authorName: author.authorName,
            bookId: book.bookId,
            bookTitle: book.bookTitle,
            totalCount: book.totalCount,
            publishingDate: book.publishingDate,
            price: book.price,
            imgUrl: book.imgUrl,
            bookContent: book.bookContent
          });
        });
      });
    });
    return parsedBooks;
  };

  const handleAddBook = async (book) => {
    try {
      await axios.post("http://localhost:9090/api/books", book);
      fetchBooks();
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleUpdateFormDataChange = (event) => {
    const { name, value } = event.target;
    setUpdateFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? parseFloat(value) || 0.0 : value
    }));
  };

  const handleUpdateBook = async () => {
    try {
      await axios.patch(`http://localhost:9090/api/books/${updateFormData.bookId}`, {
        bookTitle: updateFormData.bookTitle,
        totalCount: updateFormData.totalCount,
        publishingDate: updateFormData.publishingDate,
        price: updateFormData.price,
        imgUrl: updateFormData.imgUrl
      });
      fetchBooks();
      setUpdateFormData({
        bookId: "",
        bookTitle: "",
        totalCount: 0,
        publishingDate: "",
        price: 0.0,
        imgUrl: ""
      });
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleSwitchToAuthorPublisher = () => {
    setIsAuthorPublisherView(true);
  };

  const handleSwitchToBook = () => {
    setIsAuthorPublisherView(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter(book =>
    book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.publisherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="book-management-container">
      {isAuthorPublisherView ? (
        <AuthorPublisher onSwitchToBook={handleSwitchToBook} />
      ) : (
        <>
          <h2 className="text-center">Book Management</h2>
          <div className="button-container mb-3 text-center">
            <Button variant="primary" className="me-2" onClick={() => setIsAdding(true)}>Add Book</Button>
            <Button variant="secondary" onClick={handleSwitchToAuthorPublisher}>Update Author or Publisher</Button>
          </div>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search by title, author, or publisher"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>
          <div className="table-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Publisher ID</th>
                  <th>Publisher Name</th>
                  <th>Author ID</th>
                  <th>Author Name</th>
                  <th>Book ID</th>
                  <th>Title</th>
                  <th>Count</th>
                  <th>Publishing Date</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.bookId}>
                    <td>{book.publisherId}</td>
                    <td>{book.publisherName}</td>
                    <td>{book.authorId}</td>
                    <td>{book.authorName}</td>
                    <td>{book.bookId}</td>
                    <td>{book.bookTitle}</td>
                    <td>{book.totalCount}</td>
                    <td>{book.publishingDate}</td>
                    <td>{book.price}</td>
                    <td><img src={book.imgUrl} alt={book.bookTitle} style={{ width: "50px" }} /></td>
                    <td>
                      <Button variant="danger" className="me-2" size="sm" onClick={() => handleDeleteBook(book.bookId)}>Delete</Button>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => setUpdateFormData({
                          bookId: book.bookId,
                          bookTitle: book.bookTitle,
                          totalCount: book.totalCount,
                          publishingDate: book.publishingDate,
                          price: book.price,
                          imgUrl: book.imgUrl
                        })}
                      >
                        Update
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {isAdding && (
            <Modal show={isAdding} onHide={() => setIsAdding(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Add Book</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddBook
                  onSubmit={handleAddBook}
                  onClose={() => setIsAdding(false)}
                />
              </Modal.Body>
            </Modal>
          )}

          {updateFormData.bookId && (
            <Modal show={updateFormData.bookId !== ""} onHide={() => setUpdateFormData({ bookId: "", bookTitle: "", totalCount: 0, publishingDate: "", price: 0.0, imgUrl: "" })}>
              <Modal.Header closeButton>
                <Modal.Title>Update Book</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formBookTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      name="bookTitle"
                      value={updateFormData.bookTitle}
                      onChange={handleUpdateFormDataChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formTotalCount">
                    <Form.Label>Count</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Count"
                      name="totalCount"
                      value={updateFormData.totalCount}
                      onChange={handleUpdateFormDataChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPublishingDate">
                    <Form.Label>Publishing Date</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Publishing Date"
                      name="publishingDate"
                      value={updateFormData.publishingDate}
                      onChange={handleUpdateFormDataChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      placeholder="Price"
                      name="price"
                      value={updateFormData.price}
                      onChange={handleUpdateFormDataChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formImageUrl">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Image URL"
                      name="imgUrl"
                      value={updateFormData.imgUrl}
                      onChange={handleUpdateFormDataChange}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleUpdateBook}>Update Book</Button>
                </Form>
              </Modal.Body>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default Book;
