// import axios from 'axios';

// Define the base API URL
const API_URL = "http://localhost:8000";

// Utility to get authentication headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create Task
export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(taskData), // Ensure taskData includes all required fields
    });

    if (!response.ok) {
      const errorDetails = await response.json(); // Backend error response
      throw new Error(errorDetails.detail || "Failed to create task");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating task:", error.message);
    throw error;
  }
};




// Get Tasks
export const getTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`, { // Correct path
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error fetching tasks");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Delete Task
export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error deleting task");
    return { message: "Task deleted successfully" };
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Assign Task
export const assignTask = async (taskId, userId) => {
  try {
    const response = await fetch(`${API_URL}/tasks/assign/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ user_id: userId }),
    });
    if (!response.ok) throw new Error("Error assigning task");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Complete Task
export const completeTask = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/tasks/complete/${taskId}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error completing task");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Create User
export const createUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error("Error creating user");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Login User
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/users/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error("Error logging in");
    const data = await response.json();
    const token = data.access_token;
    localStorage.setItem("token", token); // Save token to localStorage
    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fetch Users
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users/`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error fetching users");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Log out User
export const logoutUser = () => {
  localStorage.removeItem("token"); // Remove token from localStorage
};
