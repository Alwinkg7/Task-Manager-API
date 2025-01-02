import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import TaskList from './components/TaskList';

// Utility function to retrieve token from localStorage
const getAuthToken = () => window.localStorage.getItem('token');

// PrivateRoute component for secure routing
const PrivateRoute = ({ element: Element }) => {
  const authToken = getAuthToken();
  return authToken ? <Element /> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />

        {/* TaskList Route (protected) */}
        <Route path="/tasks" element={<PrivateRoute element={TaskList} />} />

        {/* 404 Fallback */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
