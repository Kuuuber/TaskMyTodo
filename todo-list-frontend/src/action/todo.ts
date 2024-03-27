import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchTodos = async () => {
  try {
    const response = await axios.get(`${apiUrl}/todo`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const addTodo = async (newTodo: string) => {
  try {
    await axios.post(`${apiUrl}/todo`, {
      title: newTodo,
      status: 'pending',
    });
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await axios.delete(`${apiUrl}/todo/${id}`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

export const updateTodoStatus = async (todoId: number, newStatus: string) => {
  try {
    await axios.patch(`${apiUrl}/todo/${todoId}/status`, { status: newStatus });
  } catch (error) {
    console.error('Error updating todo status:', error);
    throw error;
  }
};
