import React from 'react';
import { useSelector } from 'react-redux';
import BookCard from '../BookCard/BookCard';
import './DisplayLikeCard.css';

const DisplayLikeCard = () => {
  const wishlistBooks = useSelector((state) => state.wishlist.wishlistBooks);

  return (
    <div className="liked-books-container">
      <h2>Liked Books</h2>
      <div className="liked-books-list">
        {wishlistBooks.length > 0 ? (
          wishlistBooks.map(book => (
            <BookCard
              key={book.bookId}
              book={book}
              authorName={book.authorName} // Ensure you pass the correct props if available
              publisherName={book.publisherName} // Ensure you pass the correct props if available
              inWishlist={true} // You might not need removeFromWishlist here
            />
          ))
        ) : (
          <p>No books in your wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default DisplayLikeCard;




