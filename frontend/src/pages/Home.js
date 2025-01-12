import React, { useEffect, useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taskForm, setTaskForm] = useState({ title: "", description: "", date: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch tasks for the logged-in user
    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  // Fetch all tasks for the logged-in user
  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:4000/user/${userId}/tasks`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Handle task deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Remove deleted task from the state
        setTasks(tasks.filter(task => task._id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle task editing (set form for editing)
  const handleEdit = (task) => {
    setTaskForm({ title: task.title, description: task.description, date: task.date });
    setIsEditing(true);
    setCurrentTask(task);
  };

  // Handle task update
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4000/tasks/${currentTask._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskForm),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
        setIsEditing(false);
        setTaskForm({ title: "", description: "", date: "" });
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle adding a new task
  const handleAddTask = async () => {
    try {
      const response = await fetch(`http://localhost:4000/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...taskForm, userId }),
      });
      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
        setTaskForm({ title: "", description: "", date: "" });
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Render tasks or loading state
  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>My Tasks</h1>
      {/* Task Form: Add or Edit task */}
      <div>
        <h2>{isEditing ? "Edit Task" : "Add New Task"}</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={taskForm.title}
          onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
        />
        <textarea
          placeholder="Task Description"
          value={taskForm.description}
          onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="deadline"
          value={taskForm.date}
          onChange={(e) => setTaskForm({ ...taskForm, date: e.target.value })}
        />
        <button onClick={isEditing ? handleUpdate : handleAddTask}>
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* Display Tasks */}
      <div>
        {tasks.map((task) => (
          <div key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{new Date(task.date).toLocaleString()}</p>
            {/* <p>Status: {task.status}</p> */}
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
