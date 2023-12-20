import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onDelete, onUpdate, onFetchTodo }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <Todo
          key={index}
          todo={todo}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onFetchTodo={onFetchTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
