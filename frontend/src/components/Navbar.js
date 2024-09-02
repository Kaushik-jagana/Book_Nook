import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/admin">Admin Dashboard</Link></li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
        { isAuthenticated && <li><Link to="/register">Register</Link></li> }
      </ul>
    </nav>
  );
};

export default Navbar;
