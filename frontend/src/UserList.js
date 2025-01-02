import React, { useState, useEffect } from 'react';
import { getUsers } from './api'; // Import the function from api.js

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To track any errors

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers); // Set the fetched users to state
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>; // Display loading message
  }

  if (error) {
    return <p>{error}</p>; // Display error message if fetching fails
  }

  if (users.length === 0) {
    return <p>No users found.</p>; // Display message if no users are available
  }

  return (
    <div>
      <h1>User List</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.username}</h3>
        </div>
      ))}
    </div>
  );
};

export default UserList;
