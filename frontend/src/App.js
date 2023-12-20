import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({});

  const addTodo = async (todo) => {
    setTodos([...todos, { todo }]);
    // AWS
    await axios.post(
      'https://86mzb46o60.execute-api.us-east-1.amazonaws.com/',
      { todo }
    );
  };

  const deleteTodo = async (id) => {
    // AWS
    await axios.delete(
      `https://86mzb46o60.execute-api.us-east-1.amazonaws.com/todo/${id}`
    );
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = async (id, newText) => {
    // AWS
    await axios.put(
      `https://86mzb46o60.execute-api.us-east-1.amazonaws.com/todo/${id}`,
      { todo: newText }
    );
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: newText } : todo))
    );
  };

  const fetchTodos = async () => {
    // AWS
    const getUrl =
      'https://86mzb46o60.execute-api.us-east-1.amazonaws.com/todos';
    try {
      const response = await axios.get(getUrl, {
        method: 'GET',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
      });

      setTodos(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodo = async (id) => {
    const response = await axios.get(
      `https://86mzb46o60.execute-api.us-east-1.amazonaws.com/todo/${id}`
    );
    setTodo(response?.data?.todo);
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
      {/*  */}
      <h3>{todo}</h3>
    </div>
  );
};

export default App;
