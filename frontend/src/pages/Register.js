import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee'); // Default role as 'employee'
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/staff/register', {
      username,
      password,
      role
    })
    .then(response => {
      setMessage('Registration successful!');
      setUsername('');
      setPassword('');
      setRole('employee'); // Reset to default role
    })
    .catch(error => {
      setMessage('Registration failed. Please try again.');
      console.error('There was an error registering the user:', error);
    });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
