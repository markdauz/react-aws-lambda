import React, { useState } from 'react';

const Todo = ({ todo, onDelete, onUpdate, onFetchTodo }) => {
  const [isEditing, setEditing] = useState(false);
  const [newText, setNewText] = useState(todo.todo);

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button
            onClick={() => {
              onUpdate(todo.id, newText);
              setEditing(false);
            }}
          >
            Update
          </button>
        </div>
      ) : (
        <div>
          <p onClick={() => onFetchTodo(todo.id)}>{todo.todo}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Todo;
