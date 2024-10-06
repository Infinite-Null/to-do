import React, { useState } from 'react';
import '../assets/css/TodoForm.css';

/**
 * TodoForm component handles adding new todo items.
 * It provides an input field for the user to enter a new todo and submit it.
 * Once submitted, the input field is cleared.
 *
 * @component
 * @param {Function} addTodo - Function to add a new todo item to the list.
 * @returns {JSX.Element} A form to add new todo items.
 */
function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');

  /**
   * handleSubmit handles the form submission event.
   * It prevents the default form behavior, adds the todo if the title is not empty,
   * and resets the title input field.
   *
   * @param {Event} e - The form submission event.
   * @return {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      return;
    }

    addTodo(title);
    setTitle('');
  };

  /**
   * handleChange updates the title state when the user types in the input field.
   *
   * @param {Event} e - The input change event.
   * @return {void}
   */
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <label htmlFor="todo-title">New Todo:</label>
      <input
        required
        type="text"
        id="todo-title"
        value={title}
        onChange={handleChange}
        placeholder="Enter your task"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;
