import React, { useState } from 'react';
import './EditAuthorPublisher.css';

const EditPublisher = ({ publisher, onSubmit, onClose }) => {
  const [publisherName, setPublisherName] = useState(publisher.publisherName);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPublisher = { ...publisher, publisherName };

    try {
      await onSubmit(updatedPublisher);
      onClose();
    } catch (error) {
      console.error('Error updating publisher:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Edit Publisher</h2>
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
          <button type="submit">Update Publisher</button>
        </form>
      </div>
    </div>
  );
};

export default EditPublisher;
