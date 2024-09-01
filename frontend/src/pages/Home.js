import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/books')
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    return (
        <div>
            <h1>Welcome to The Book Nook</h1>
            <div>
                {books.map(book => (
                    <div key={book.isbn}>
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                        <p>Genre: {book.genre}</p>
                        <Link to={`/book/${book.isbn}`}>
                            <button>View Details</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
