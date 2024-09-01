import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/books/${isbn}`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [isbn]);

  return (
    <div>
      {book ? (
        <div>
          <h1>{book.title}</h1>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Price: ${book.price}</p>
          <p>Quantity in Stock: {book.quantity}</p>
          <button>Add to Cart</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookDetail;
