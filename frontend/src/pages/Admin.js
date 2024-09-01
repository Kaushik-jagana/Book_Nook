import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '', author: '', genre: '', isbn: '', price: '', quantity: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/books', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => setBooks(response.data))
    .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = () => {
    axios.post('http://localhost:3000/api/v1/books/add', newBook, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setBooks([...books, response.data]);
      setNewBook({ title: '', author: '', genre: '', isbn: '', price: '', quantity: '' });
    })
    .catch(error => console.error('Error adding book:', error));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Add New Book</h2>
        <input type="text" name="title" value={newBook.title} onChange={handleInputChange} placeholder="Title" />
        <input type="text" name="author" value={newBook.author} onChange={handleInputChange} placeholder="Author" />
        <input type="text" name="genre" value={newBook.genre} onChange={handleInputChange} placeholder="Genre" />
        <input type="text" name="isbn" value={newBook.isbn} onChange={handleInputChange} placeholder="ISBN" />
        <input type="number" name="price" value={newBook.price} onChange={handleInputChange} placeholder="Price" />
        <input type="number" name="quantity" value={newBook.quantity} onChange={handleInputChange} placeholder="Quantity" />
        <button onClick={handleAddBook}>Add Book</button>
      </div>
      <div>
        <h2>Current Inventory</h2>
        {books.map(book => (
          <div key={book.isbn}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Price: ${book.price}</p>
            <p>Quantity: {book.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
