import React from 'react';
import DisplayLikeCard from '../BookCard/DisplayLikeCard';
// import './LikedBooksPage.css';

const LikedBooksPage = ({ location }) => {
  const { wishlistBooks = [] } = location.state || {};

  return (
    <div className="liked-books-page">
      <h2>Liked Books</h2>
      <DisplayLikeCard wishlistBooks={wishlistBooks} />
      <button className='btn btn-primary mt-3'></button>
    </div>
  );
};

export default LikedBooksPage;
