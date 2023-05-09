import React, { useState } from 'react';

function TodoForm({ onSubmit }) {
  const [newTodo, setNewTodo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
    setErrorMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    onSubmit(newTodo);
    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="todo">ToDo: </label>
        <input
          type="text"
          value={newTodo}
          onChange={handleNewTodoChange}
        />
      </div>
      <div style={{ marginTop: '5px' }}>
        {errorMessage && (
          <div style={{ color: 'red' }}>{errorMessage}</div>
        )}
        <button>Add ToDo!</button>
      </div>
    </form>
  );
}

export default TodoForm;
