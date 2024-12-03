import React from "react";

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
      <span
        style={{
          flex: 1,
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.title}
      </span>
      <button onClick={() => toggleComplete(todo.id)}>
        {todo.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: "10px" }}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;