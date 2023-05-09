import React, { useState, useEffect } from 'react';
import './App.css';
import TodoCard from './TodoCard';
const BASE_URL = "http://localhost:8000"

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await fetch(BASE_URL+'/todos/');
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
    setErrorMessage('');
  };

  const handleNewTodoSubmit = async (event) => {
    event.preventDefault();
  
    if (!newTodo) {
      setErrorMessage('Todo field can not be empty!');
      return;
    }
  
    const todo = { title: newTodo };
  
    try {
      const response = await fetch(BASE_URL+'/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setNewTodo('');
      fetchTodos(); 
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="App" >
      <div>
        <h1>List of TODOs</h1>
        <ul>
          {todos.map((todo) => (
            <TodoCard key={todo._id} todo={todo} />
          ))}
        </ul>
      </div>
      <div>
        <h1>Create a ToDo</h1>
        <form onSubmit={handleNewTodoSubmit}>
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
      </div>
    </div>
  );
}

export default App;
