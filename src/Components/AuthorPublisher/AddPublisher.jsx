import React, { useState } from 'react';

const AddPublisher = ({ onSubmit, onClose }) => {
  const [publisherName, setPublisherName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPublisher = { publisherName };

    try {
      await onSubmit(newPublisher);
      setPublisherName('');
      onClose();
    } catch (error) {
      console.error('Error adding publisher:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Add New Publisher</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Publisher Name:</label>
            <input
              type="text"
              value={publisherName}
              onChange={(e) => setPublisherName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Publisher</button>
        </form>
      </div>
    </div>
  );
};

export default AddPublisher;

