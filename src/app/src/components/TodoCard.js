import React, { useState } from 'react';

function TodoCard({ todo, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo.title);

  const handleDelete = () => {
    onDelete(todo);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedTodo(todo.title);
  };

  const handleSave = () => {
    onEdit({
      ...todo,
      title: updatedTodo,
    });
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    setUpdatedTodo(event.target.value);
  };

  return (
    <li className="todo-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedTodo}
            onChange={handleInputChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{todo.title}</h2>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TodoCard;
