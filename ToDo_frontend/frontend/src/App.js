import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get("https://<your-api-app-name>.azurewebsites.net/api/todos")
      .then((res) => setTodos(res.data));
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    axios
      .post("https://<your-api-app-name>.azurewebsites.net/api/todos", newTodo, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => setTodos(res.data));
    setNewTodo("");
  };

  const deleteTodo = (index) => {
    axios
      .delete(`https://<your-api-app-name>.azurewebsites.net/api/todos/${index}`)
      .then((res) => setTodos(res.data));
  };

  return (
    <div className="app-container">
      <h1 className="title">🌸 My Cute To-Do List 🌸</h1>

      <div className="input-box">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="✨ Add a new task..."
        />
        <button onClick={addTodo}>➕ Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, i) => (
          <li key={i} className="todo-item">
            <span>💖 {todo}</span>
            <button className="delete-btn" onClick={() => deleteTodo(i)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
