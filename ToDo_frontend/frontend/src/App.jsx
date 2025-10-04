import React, { useState, useEffect } from "react";
import "./App.css";
import todoApi from "./api/todoApi";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load todos from backend on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const todosData = await todoApi.getTodos();
      setTodos(todosData);
    } catch (err) {
      setError("Failed to load todos. Please check if the backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add task
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const newTodoItem = await todoApi.createTodo(newTodo);
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    } catch (err) {
      setError("Failed to add todo. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await todoApi.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Edit task (load into input)
  const startEdit = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
    setNewTodo(todo.task);
  };

  // Update task
  const updateTodo = async () => {
    if (!newTodo.trim() || !currentTodo) return;
    
    try {
      setLoading(true);
      setError(null);
      const updatedTodo = await todoApi.updateTodo(currentTodo.id, {
        task: newTodo,
        isDone: currentTodo.isDone
      });
      
      setTodos(todos.map(todo => 
        todo.id === currentTodo.id ? updatedTodo : todo
      ));
      
      setIsEditing(false);
      setNewTodo("");
      setCurrentTodo(null);
    } catch (err) {
      setError("Failed to update todo. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle todo completion status
  const toggleTodo = async (todo) => {
    try {
      setLoading(true);
      setError(null);
      const updatedTodo = await todoApi.updateTodo(todo.id, {
        task: todo.task,
        isDone: !todo.isDone
      });
      
      setTodos(todos.map(t => 
        t.id === todo.id ? updatedTodo : t
      ));
    } catch (err) {
      setError("Failed to update todo status. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Floating flowers */}
      {["🌸", "🌺", "🌼", "💮"].map((f, i) => (
        <span
          key={i}
          className="flower"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${5 + Math.random() * 10}s`,
            fontSize: `${20 + Math.random() * 20}px`,
          }}
        >
          {f}
        </span>
      ))}

      <div className="app-container">
        <h1 className="title"> To-Do List </h1>

        {/* Error Message */}
        {error && (
          <div style={{ 
            color: "#ff4444", 
            backgroundColor: "#ffe6e6", 
            padding: "10px", 
            borderRadius: "5px", 
            marginBottom: "20px",
            border: "1px solid #ff4444"
          }}>
            {error}
          </div>
        )}

        {/* Input + Add/Update Button */}
        <div className="input-box">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="✨ Add or update a task..."
            disabled={loading}
          />
          {isEditing ? (
            <button onClick={updateTodo} disabled={loading}>
              {loading ? "⏳" : "✏️ Update"}
            </button>
          ) : (
            <button onClick={addTodo} disabled={loading}>
              {loading ? "⏳" : "➕ Add"}
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && todos.length === 0 && (
          <div style={{ textAlign: "center", margin: "20px 0", color: "#ff69b4" }}>
            ⏳ Loading todos...
          </div>
        )}

        {/* Task List */}
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={`todo-item bounce ${todo.isDone ? 'completed' : ''}`}>
              <span 
                style={{ 
                  textDecoration: todo.isDone ? 'line-through' : 'none',
                  opacity: todo.isDone ? 0.6 : 1,
                  cursor: 'pointer'
                }}
                onClick={() => toggleTodo(todo)}
              >
                {todo.isDone ? "✅" : "🌼"} {todo.task}
              </span>
              <div>
                <button 
                  className="update-btn" 
                  onClick={() => startEdit(todo)}
                  disabled={loading}
                >
                  ✏️
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => deleteTodo(todo.id)}
                  disabled={loading}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>

        {todos.length === 0 && !loading && (
          <div style={{ textAlign: "center", margin: "20px 0", color: "#ff69b4" }}>
            No todos yet. Add one above! ✨
          </div>
        )}

        <p style={{ marginTop: "20px", color: "#ff69b4", fontSize: "14px" }}>
          ✨ Small steps every day make big dreams come true ✨
        </p>
      </div>
    </div>
  );
}

export default App;
