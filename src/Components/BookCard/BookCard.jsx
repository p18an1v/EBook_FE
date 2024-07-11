import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../redux/actions';
import { Card, Button, Modal, Image, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './BookCard.css'; // Ensure your styles are defined here

const BookCard = ({ book }) => {
  const [expanded, setExpanded] = useState(false);
  const [stockCount, setStockCount] = useState(book.totalCount); // State for available stock
  const dispatch = useDispatch();
  const wishlistBooks = useSelector((state) => state.wishlist.wishlistBooks);

  const inWishlist = wishlistBooks.some((b) => b.bookId === book.bookId);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleBuy = () => {
    // Retrieve user data from localStorage
    const userId = localStorage.getItem('userId'); // Replace with your actual key for userId
    const userEmail = localStorage.getItem('userEmail'); // Replace with your actual key for userEmail

    // Check if userId or userEmail is missing
    if (!userId || !userEmail) {
      alert('User information missing. Please log in again.');
      // Redirect to login page or handle authentication flow
      return;
    }

    const purchaseRequest = {
      bookId: book.bookId,
      userId,
      userEmail,
    };

    axios.post('http://localhost:9090/api/purchases', purchaseRequest)
      .then(response => {
        alert(`Successfully purchased ${book.bookTitle}`);
        setStockCount(stockCount - 1); // Decrease stock count locally
      })
      .catch(error => {
        console.error('There was an error purchasing the book!', error);
        alert('Failed to purchase the book. Please try again.');
      });
  };

  const handleAddToWishlist = () => {
    if (inWishlist) {
      dispatch(removeFromWishlist(book.bookId));
      alert(`Removed ${book.bookTitle} from wishlist`);
    } else {
      dispatch(addToWishlist(book));
      alert(`Added ${book.bookTitle} to wishlist`);
    }
  };

  return (
    <Card className="book-card">
      <Image variant="top" src={book.imgUrl} alt={book.bookTitle} className="book-image" fluid />
      <Card.Body>
        <Card.Title><strong>{book.bookTitle}</strong></Card.Title>
        <Card.Text><strong>Author:</strong> {book.authorName}</Card.Text>
        <Card.Text><strong>Publisher:</strong> {book.publisherName}</Card.Text>
        <Card.Text><strong>Price:</strong> ${book.price}</Card.Text>
        <Card.Text><strong>Available stock:</strong> {stockCount}</Card.Text> {/* Display dynamic stock count */}
        <Row className="book-actions">
          <Col>
            <Button variant="primary" onClick={toggleExpand} className="w-100 mb-2">
              <FaEye /> View
            </Button>
          </Col>
          <Col>
            <Button variant="success" onClick={handleBuy} className="w-100 mb-2">
              <FaShoppingCart /> Buy
            </Button>
          </Col>
          <Col>
            <Button variant={inWishlist ? "danger" : "info"} onClick={handleAddToWishlist} className="w-100 mb-2">
              <FaHeart style={{ color: inWishlist ? 'red' : 'white' }} /> {inWishlist ? "Remove" : "Wishlist"}
            </Button>
          </Col>
        </Row>
      </Card.Body>

      <Modal show={expanded} onHide={toggleExpand} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{book.bookTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={book.imgUrl} alt={book.bookTitle} fluid className="mb-3" />
          <p><strong>Author:</strong> {book.authorName}</p>
          <p><strong>Publisher:</strong> {book.publisherName}</p>
          <p><strong>Publishing Date:</strong> {book.publishingDate}</p>
          <p><strong>Price:</strong> ${book.price}</p>
          <h4>Book Description</h4>
          <p>{book.bookContent || "No description available."}</p>
          <p><strong>Available stock:</strong> {stockCount}</p> {/* Display dynamic stock count */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleExpand}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBuy}>
            <FaShoppingCart /> Buy
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default BookCard;

