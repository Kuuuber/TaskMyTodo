// TodoList.ts
import React, { useState, useEffect } from 'react';
import { fetchTodos, addTodo, deleteTodo, updateTodoStatus } from '../action/todo'; // Імпорт функцій дій з todo
import styles from './todo.module.css';


interface Todo {
  id: number;
  title: string;
  status: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = async () => {
    try {
      const todoList = await fetchTodos();
      setTodos(todoList);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async () => {
    try {
      await addTodo(newTodo);
      setNewTodo('');
      fetchTodoList();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      fetchTodoList();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdateTodoStatus = async (todoId: number, newStatus: string) => {
    try {
      await updateTodoStatus(todoId, newStatus);
      fetchTodoList();
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  return (
    <div className={styles.todoContainer}>
      <h1>Todo List</h1>
      <input
        type="text"
        className={styles.todoInput}
        placeholder="Enter new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button className={styles.addTodoButton} onClick={handleAddTodo} disabled={!newTodo.trim()}>Add Todo</button>
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.todoItem}>
            <span className={styles.todoItemContent}>{todo.title} - {todo.status}</span>
            
            {todo.status === 'pending' && (
              <button className={styles.todoItemButton} onClick={() => handleUpdateTodoStatus(todo.id, 'in_progress')}>Start</button>
            )}
            {todo.status === 'in_progress' && (
              <button className={styles.todoItemButton} onClick={() => handleUpdateTodoStatus(todo.id, 'completed')}>Complete</button>
            )}
            <button className={styles.deleteButton} onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
