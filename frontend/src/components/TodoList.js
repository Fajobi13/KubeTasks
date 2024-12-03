import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, toggleComplete, deleteTodo }) => {
  if (!todos.length) {
    return <p>No tasks available.</p>;
  }

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;