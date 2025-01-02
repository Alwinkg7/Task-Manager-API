import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, createUser } from '../api'; // Adjusted path to '../api'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and sign-up
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const token = await loginUser(username, password); // Removed unnecessary setMessage parameter
      if (token) {
        localStorage.setItem('token', token); // Store token in localStorage
        setIsLoggedIn(true);
        setMessage('Login successful!');
        navigate('/tasks'); // Redirect to tasks page
      }
    } catch (error) {
      setMessage(error?.response?.data?.detail || 'Error logging in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      await createUser(username, password);
      setMessage('User created successfully! You can now log in.');
      setIsRegistering(false); // Switch back to login mode
    } catch (error) {
      setMessage(error?.response?.data?.detail || 'Error creating user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    setIsLoggedIn(false);
    setMessage('Logged out successfully!');
    navigate('/'); // Redirect to the login page
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      {isLoggedIn ? (
        <div>
          <h3>Welcome, {username}!</h3>
          <button onClick={handleLogout} disabled={loading}>
            Logout
          </button>
          {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
      ) : (
        <div>
          <h3>{isRegistering ? 'Sign Up' : 'Login'}</h3>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: '10px', margin: '5px' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '10px', margin: '5px' }}
            />
          </div>
          {isRegistering ? (
            <button onClick={handleRegister} disabled={loading} style={{ margin: '5px' }}>
              Sign Up
            </button>
          ) : (
            <button onClick={handleLogin} disabled={loading} style={{ margin: '5px' }}>
              Login
            </button>
          )}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            disabled={loading}
            style={{ margin: '5px' }}
          >
            {isRegistering ? 'Back to Login' : 'Create Account'}
          </button>
          {message && <p style={{ color: 'red' }}>{message}</p>}
        </div>
      )}
    </div>
  );
}

export default Login;
