import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/api/staff/login', {
      username,
      password
    })
    .then(response => {
      setMessage('Login successful!');
      login(response.data.token); 
      navigate('/admin'); // Redirect to the home page or admin dashboard after login
    })
    .catch(error => {
      setMessage('Login failed. Please check your username and password.');
      console.error('There was an error logging in:', error);
    });
  };

  return (
    <div>
      <h1>Staff Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
