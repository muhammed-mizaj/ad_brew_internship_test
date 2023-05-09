import { BASE_URL } from "../constants/urls";

const todoService = {
  async getAllTodos() {
    const response = await fetch(`${BASE_URL}/todos`);
    const data = await response.json();
    return data.todos;
  },

  async createTodo(todo) {
    const new_todo = { title: todo };
    const response = await fetch(`${BASE_URL}/todos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(new_todo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.todo;
  },

  async updateTodo(todo) {
    const response = await fetch(`${BASE_URL}/todos/${todo._id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title:todo.title}),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.todo;
  },

  async deleteTodo(todoId) {
    const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.todo;
  },
};

export default todoService;
