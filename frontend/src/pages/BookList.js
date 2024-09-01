import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [genre, setGenre] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/books?genre=${genre}`)
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));
    }, [genre]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/books?page=${page}&limit=10`)
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));
    }, [page]);

    return (
        <div>
            <h1>Book List</h1>
            <select onChange={(e) => setGenre(e.target.value)}>
                <option value="">All Genres</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Fantasy">Fantasy</option>
            </select>
            <div>
                {books.map(book => (
                    <div key={book.isbn}>
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                        <p>Genre: {book.genre}</p>
                        <p>Price: ${book.price}</p>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</button>
                <span>Page {page}</span>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default BookList;
