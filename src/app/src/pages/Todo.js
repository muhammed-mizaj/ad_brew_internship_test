import React, { useState, useEffect } from 'react';
import todoService from '../services/todoService';
import ErrorBanner from '../components/ErrorBanner';
import TodoCard from '../components/TodoCard';
import TodoForm from '../components/TodoForm';
import '../App.css';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchTodos = async () => {
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleNewTodoSubmit = async (newTodo) => {
    
    if (!newTodo) {
        setErrorMessage('Todo field can not be empty!');
        return;
    }

    try {
      await todoService.createTodo(newTodo);
      setErrorMessage('');
      fetchTodos();
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to create todo');
    }
  };

  const handleDeleteTodo = async (todo) => {
    try {
      await todoService.deleteTodo(todo._id);
      setErrorMessage('');
      fetchTodos();
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to delete todo');
    }
  };
  const handleEditTodo = async (updatedTodo) => {
    if (!updatedTodo.title) {
      setErrorMessage('Todo cannot be empty!');
      return;
    }
  
    try {
      await todoService.updateTodo(updatedTodo);
      setErrorMessage('');
      fetchTodos();
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to update todo');
    }
  };
  

  return (
    <div className="todo-container">
      <h1>List of TODOs</h1>
      <ul className="todo-list">
        <ErrorBanner errorMessage={errorMessage}/>
        {todos.map((todo) => (
          <TodoCard
            key={todo._id}
            todo={todo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
        
      </ul>
      <TodoForm onSubmit={handleNewTodoSubmit} className="todo-form" />
    </div>
  );
}

export default Todo;
