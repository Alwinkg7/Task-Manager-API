import React, { useState, useEffect } from "react";
import { getTasks, createTask, deleteTask, assignTask, completeTask } from "../api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState(1); // Mocked for now
  const [assignedUserId, setAssignedUserId] = useState(null); // Optional

  // Fetch tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };





const handleCreateTask = async () => {
  try {
    const newTask = {
      // title: newTask, // Ensure this input exists in your component
      description: newDescription, // Ensure this input exists in your component
      owner_id: loggedInUserId, // Replace with actual logic for setting owner ID
      assigned_user_id: assignedUserId || null, // Optional field
    };

    const createdTask = await createTask(newTask);
    setTasks((prevTasks) => [...prevTasks, createdTask]); // Update the UI with the new task
    setNewTask(""); // Clear input
    setNewDescription(""); // Clear input

  } catch (error) {
    console.error("Error creating task:", error.message);
    alert(`Task creation failed: ${error.message}`);
  }
};


const handleDeleteTask = async (taskId) => {
  try {
    console.log("Attempting to delete task with ID:", taskId); // Log task ID for debugging
    await deleteTask(taskId);
    setTasks((prev) => prev.filter((task) => task.id !== taskId)); // Remove the deleted task
    console.log("Task deleted successfully"); // Confirm successful deletion
  } catch (error) {
    // Log and alert the user for better error visibility
    console.error("Error deleting task:", error.message || error);
    alert(`Failed to delete task: ${error.message || "Unknown error occurred"}`);
  }
};


const handleCompleteTask = async (taskId) => {
  try {
    console.log(`Marking task ${taskId} as complete...`); // Debugging log for start
    const updatedTask = await completeTask(taskId);
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? updatedTask : task))
    ); // Update the specific task in the list
    console.log(`Task ${taskId} marked as complete.`, updatedTask); // Debugging log for success
    alert(`Task "${updatedTask.title}" marked as complete!`); // User feedback
  } catch (error) {
    console.error("Error completing task:", error.message || error); // Detailed error logging
    alert(`Failed to mark task as complete: ${error.message || "Unknown error occurred"}`); // User feedback
  }
};


  return (
      <div>
        <h1>Task List</h1>
        <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task title"
        />
        <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Enter task description"

        />


        <button onClick={handleCreateTask}>Create Task</button>

        <ul>
          {tasks.map((task) => (
              <li key={task.id}>
                <strong>{task.title}</strong>
                <p>{task.description}</p>
                <small>Status: {task.status}</small>
                <br/>
                <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default TaskList;
