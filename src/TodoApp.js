import React, { useState } from 'react';
import './TodoApp.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleCompleteTodo = (index) => {
    const updatedTodos = todos.map((todo, idx) =>
      idx === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const handleSaveTodo = (index) => {
    const updatedTodos = todos.map((todo, idx) =>
      idx === index ? { ...todo, text: editText } : todo
    );
    setTodos(updatedTodos);
    setEditIndex(null);
  };

  const handleRemoveTodo = (index) => {
    const updatedTodos = todos.filter((_, idx) => idx !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="add-todo-box">
        <div className="add-todo">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
          />
          <button onClick={handleAddTodo} disabled={!newTodo.trim()}>Add</button>
        </div>
      </div>
      
      {todos.length === 0 ? (
        <p>No todos available. Add a todo to get started!</p>
      ) : (
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className={todo.completed ? 'completed' : ''}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => handleSaveTodo(index)}>Save</button>
                </>
              ) : (
                <>
                  <span>{todo.text}</span>
                  <button
                    onClick={() => handleCompleteTodo(index)}
                    disabled={todo.completed || editIndex !== null}
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleEditTodo(index)}
                    disabled={todo.completed || editIndex !== null}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveTodo(index)}
                    disabled={todo.completed || editIndex !== null}
                  >
                    Remove
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoApp;
