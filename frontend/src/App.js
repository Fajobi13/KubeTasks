import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

// Use environment variable or default to localhost:5000
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  // Fetch todos when the app loads
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/todos`);
      setTodos(response.data);
    } catch (error) {
      setError("Error fetching todos");
      console.error("Error fetching todos:", error.message || error.response);
    }
  };

  const addTodo = async (title) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/todos`, { title });
      setTodos([...todos, response.data]);
      setError(""); // Clear any existing errors
    } catch (error) {
      setError("Error adding todo");
      console.error("Error adding todo:", error.message || error.response);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      const response = await axios.put(`${API_BASE_URL}/api/todos/${id}`, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t.id === id ? response.data : t)));
      setError(""); // Clear any existing errors
    } catch (error) {
      setError("Error updating todo");
      console.error("Error updating todo:", error.message || error.response);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/todos/${id}`);
      setTodos(todos.filter((t) => t.id !== id));
      setError(""); // Clear any existing errors
    } catch (error) {
      setError("Error deleting todo");
      console.error("Error deleting todo:", error.message || error.response);
    }
  };

  return (
    <div className="container">
      <h1>To-Do App</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <AddTodo addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default App;