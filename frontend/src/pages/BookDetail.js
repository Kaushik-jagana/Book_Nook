import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const BookDetail = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);
  const { addToCart } = useContext(CartContext);

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
          <button onClick={() => addToCart(book)}>Add to Cart</button>
          <Link to="/cart">
            <button>View Cart</button>
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookDetail;
