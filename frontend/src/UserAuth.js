import React, { useState } from 'react';
import { createUser, loginUser } from './api'; // Import the functions from api.js

const UserAuth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await createUser(username, password);
      setMessage('User registered successfully!');
      setUsername(''); // Clear the username field
      setPassword(''); // Clear the password field
    } catch (error) {
      setMessage('Error registering user.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await loginUser(username, password);
      setMessage('Login successful!');
      setUsername(''); // Clear the username field
      setPassword(''); // Clear the password field
    } catch (error) {
      setMessage('Error logging in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>User Authentication</h1>

      {/* Register Section */}
      <div>
        <h3>Register</h3>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>

      {/* Login Section */}
      <div>
        <h3>Login</h3>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>

      {/* Display message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserAuth;
