// TodoList.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css';

interface Todo {
  id: number;
  title: string;
  status: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get<Todo[]>('http://localhost:3000/todo');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      await axios.post('http://localhost:3000/todo', {
        title: newTodo,
        status: 'pending',
      });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/todo/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const updateTodoStatus = async (todoId: number, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:3000/todo/${todoId}/status`, { status: newStatus });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <input
        type="text"
        className="todo-input"
        placeholder="Enter new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button className="add-todo-button" 
      onClick={addTodo} 
      disabled={!newTodo.trim()}
      style={{ cursor: !newTodo.trim() ? 'not-allowed' : 'pointer' }}>Add Todo</button>
      
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            
            <span>{todo.title} - {todo.status}</span>
            <div className="todo-button">
            {todo.status === 'pending' && (
              <button onClick={() => updateTodoStatus(todo.id, 'in_progress')}>Start</button>
            )}
            {todo.status === 'in_progress' && (
              <button onClick={() => updateTodoStatus(todo.id, 'completed')}>Complete</button>
            )}
            <button className="delete-button" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
