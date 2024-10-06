import { useState, useEffect } from 'react';
import { getLocalData, setLocalData } from '../utils/localStorage';

/**
 * useTodo is a custom hook for managing a todo list.
 * It handles fetching todos from local storage, adding, updating, toggling the status,
 * and deleting todos, while also synchronizing the state with local storage.
 *
 * @returns {Object} The current todos and functions to modify the todo list:
 * - {Array} todos: The list of todos.
 * - {Function} addTodo: Function to add a new todo.
 * - {Function} updateTodo: Function to update the title of an existing todo.
 * - {Function} toggleTodoStatus: Function to toggle the completion status of a todo.
 * - {Function} deleteTodo: Function to delete a todo.
 * - {Function} setTodos: Function to manually set the todos state.
 */
const useTodo = () => {
  const [todos, setTodos] = useState(getLocalData);

  /**
   * Syncs the todos state with local storage whenever todos are updated.
   */
  useEffect(() => {
    setLocalData(todos);
  }, [todos]);

  /**
   * Adds a new todo to the todo list.
   * The new todo is prepended to the existing todos and assigned a unique ID.
   *
   * @param {string} title - The title of the new todo.
   * @return {void}
   */
  const addTodo = (title) => {
    if ('' === title.trim()) {
      return;
    }

    const newTodo = {
      id: crypto.randomUUID(),
      is_Done: false,
      title: title.trim()
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  /**
   * Updates the title of an existing todo.
   * It finds the todo by its ID and updates its title.
   *
   * @param {string} id - The ID of the todo to update.
   * @param {string} updatedTitle - The new title for the todo.
   * @return {void}
   */
  const updateTodo = (id, updatedTitle) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, title: updatedTitle } : todo))
    );
  };

  /**
   * Toggles the completion status of a todo.
   * It finds the todo by its ID and toggles its `is_Done` property.
   *
   * @param {string} id - The ID of the todo to toggle.
   * @return {void}
   */
  const toggleTodoStatus = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, is_Done: !todo.is_Done } : todo))
    );
  };

  /**
   * Deletes a todo from the todo list.
   * It removes the todo with the given ID from the state.
   *
   * @param {string} id - The ID of the todo to delete.
   * @return {void}
   */
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    addTodo,
    updateTodo,
    toggleTodoStatus,
    deleteTodo,
    setTodos
  };
};

export default useTodo;
