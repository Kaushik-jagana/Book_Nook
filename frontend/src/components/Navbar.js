import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token');
  
    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          {token ? (
            <>
              <li><Link to="/admin">Admin Dashboard</Link></li>
              <li><button onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/';
              }}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Staff Login</Link></li>
          )}
        </ul>
      </nav>
    );
  };

export default Navbar;
