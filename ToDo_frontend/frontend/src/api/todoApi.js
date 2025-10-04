import axios from 'axios';

const API_BASE_URL = 'http://localhost:5033/api/todos';

const todoApi = {
  // Get all todos
  async getTodos() {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // Create a new todo
  async createTodo(task) {
    try {
      const response = await axios.post(API_BASE_URL, task, {
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
      const response = await axios.put(`${API_BASE_URL}/${id}`, todoData, {
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
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
};

export default todoApi;

