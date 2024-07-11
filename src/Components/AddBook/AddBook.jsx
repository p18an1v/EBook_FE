import React, { useState } from 'react';
import axios from 'axios';
import './AddBook.css';

const AddBook = ({ onSubmit, onClose }) => {
  const [bookTitle, setBookTitle] = useState('');
  const [totalCount, setTotalCount] = useState('');
  const [publishingDate, setPublishingDate] = useState('');
  const [price, setPrice] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [publisherName, setPublisherName] = useState('');
  const [bookContent, setBookContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent further submissions while loading
    setLoading(true);

    console.log('Form Submitted'); // Debugging log

    const newBook = {
      bookTitle,
      totalCount: parseInt(totalCount),
      publishingDate,
      price: parseFloat(price),
      imgUrl,
      authorName,
      publisherName,
      bookContent
    };

    try {
      console.log('Sending request to API'); // Debugging log
      await axios.post('http://localhost:9090/api/books', newBook);
      alert("Book added successfully");
      // Clear the form
      setBookTitle('');
      setTotalCount('');
      setPublishingDate('');
      setPrice('');
      setImgUrl('');
      setAuthorName('');
      setPublisherName('');
      setBookContent('');
      onSubmit(newBook);
      onClose();
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Book Title:</label>
            <input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Total Count:</label>
            <input
              type="number"
              value={totalCount}
              onChange={(e) => setTotalCount(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Publishing Date:</label>
            <input
              type="date"
              value={publishingDate}
              onChange={(e) => setPublishingDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Author Name:</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Publisher Name:</label>
            <input
              type="text"
              value={publisherName}
              onChange={(e) => setPublisherName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Book Content:</label>
            <textarea
              value={bookContent}
              onChange={(e) => setBookContent(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;



