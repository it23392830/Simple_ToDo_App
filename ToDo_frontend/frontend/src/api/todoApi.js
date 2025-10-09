import axios from 'axios';

// Determine API base host. In dev use local backend; in prod prefer VITE_API_BASE_URL.
const API_HOST = import.meta.env.DEV
  ? 'http://localhost:5033'
  : (import.meta.env.VITE_API_BASE_URL || '');

// Full endpoint for todos
const TODOS_ENDPOINT = `${API_HOST}/api/todos`;

const todoApi = {
  // Get all todos
  async getTodos() {
    try {
      const response = await axios.get(TODOS_ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // Create a new todo
  async createTodo(task) {
    try {
      const response = await axios.post(TODOS_ENDPOINT, task, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  // Update a todo
  async updateTodo(id, todoData) {
    try {
      const response = await axios.put(`${TODOS_ENDPOINT}/${id}`, todoData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  // Delete a todo
  async deleteTodo(id) {
    try {
      await axios.delete(`${TODOS_ENDPOINT}/${id}`);
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
};

export default todoApi;

