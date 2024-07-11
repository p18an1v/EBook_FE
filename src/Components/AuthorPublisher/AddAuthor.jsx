import React, { useState } from 'react';

const AddAuthor = ({ onSubmit, onClose }) => {
  const [authorName, setAuthorName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAuthor = { authorName };

    try {
      await onSubmit(newAuthor);
      setAuthorName('');
      onClose();
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Add New Author</h2>
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
          <button type="submit">Add Author</button>
        </form>
      </div>
    </div>
  );
};

export default AddAuthor;
