import React, { useState } from 'react';

function TodoCard({ todo, onEdit, onDelete }) {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    const updatedTodo = { ...todo, title: editedTitle };
    try {
      const response = await fetch(`http://localhost:8000/todos/${todo._id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title:editedTitle }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setEditMode(false);
      onEdit(updatedTodo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = () => {
    onDelete(todo);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  return (
    <div style={{ backgroundColor: 'lightgrey', padding: '10px', marginBottom: '10px' }}>
      {!editMode ? (
        <div>
          <h3>{todo.title}</h3>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      ) : (
        <div>
          <input type="text" value={editedTitle} onChange={handleTitleChange} />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      )}
    </div>
  );
}

export default TodoCard;
