import React, { useState } from "react";

const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Add a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ padding: "8px", width: "80%" }}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;