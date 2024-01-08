import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(undefined);

  const AWS_URL = 'https://fjghc4nrzb.execute-api.us-east-1.amazonaws.com/';

  const addTodo = async (todo) => {
    if (todo.trim() === '') return;
    setTodos([...todos, { todo }]);
    // AWS
    await axios.post(AWS_URL, { todo });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    // AWS
    await axios.delete(`${AWS_URL}todo/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = async (id, newText) => {
    // AWS
    await axios.put(`${AWS_URL}todo/${id}`, { todo: newText });
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: newText } : todo))
    );
  };

  const fetchTodos = async () => {
    // AWS
    const getUrl = `${AWS_URL}todos`;
    try {
      const response = await axios.get(getUrl, {
        method: 'GET',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
      setTodos(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodo = async (id) => {
    try {
      const response = await axios.get(`${AWS_URL}todo/${id}`, {
        method: 'GET',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
      });
      setTodo(response?.data?.todo);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
        onFetchTodo={fetchTodo}
      />

      {todo !== undefined || Object.keys(todo || {}).length === 0 ? (
        <h3>{todo}</h3>
      ) : null}
    </div>
  );
};

export default App;
