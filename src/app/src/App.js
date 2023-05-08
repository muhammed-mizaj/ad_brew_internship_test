import React, { useState, useEffect } from 'react';
import './App.css';
const BASE_URL = 'http://localhost:8000'


function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(BASE_URL+'/todos/');
        const data = await response.json();
        setTodos(data.todos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, []);

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = async (event) => {
    event.preventDefault();

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
      setTodos([...todos, data]);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="py-4 px-8 bg-white shadow-md">
        <h1 className="text-2xl font-bold">List of TODOs</h1>
      </header>
      <main className="flex-1 container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <ul className="border border-gray-300 p-4">
              {todos.map((todo) => (
                <li key={todo.id} className="mb-2">
                  {todo.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/3">
            <h2 className="text-xl font-bold mb-2">Create a ToDo</h2>
            <form onSubmit={handleNewTodoSubmit}>
              <div className="mb-2">
                <label htmlFor="todo" className="font-bold">
                  ToDo:{' '}
                </label>
                <input
                  type="text"
                  className="border border-gray-400 rounded px-2 py-1 w-full"
                  value={newTodo}
                  onChange={handleNewTodoChange}
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Add ToDo!
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
