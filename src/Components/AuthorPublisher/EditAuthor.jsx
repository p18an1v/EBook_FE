import React, { useState } from 'react';
import './EditAuthorPublisher.css';

const EditAuthor = ({ author, onSubmit, onClose }) => {
  const [authorName, setAuthorName] = useState(author.authorName);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAuthor = { ...author, authorName };

    try {
      await onSubmit(updatedAuthor);
      onClose();
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Edit Author</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Author Name:</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update Author</button>
        </form>
      </div>
    </div>
  );
};

export default EditAuthor;
