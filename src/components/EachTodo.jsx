import React, { useState } from 'react';
import '../assets/css/EachTodo.css';

/**
 * EachTodo component is responsible for rendering an individual todo item.
 * It allows the user to edit the todo's title, toggle its completion status,
 * and delete the todo item. The component also manages a local state for editing the title.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.todo - The todo object containing id, title, and is_Done status
 * @param {Function} props.updateTodo - Function to update the todo's title
 * @param {Function} props.toggleTodoStatus - Function to toggle the todo's completion status
 * @param {Function} props.deleteTodo - Function to delete the todo
 * @returns {JSX.Element} A rendered todo item with edit, toggle, and delete functionality
 */
function EachTodo({ todo, updateTodo, toggleTodoStatus, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo?.title || 'Untitled');

  /**
   * handleEditClick sets the component in editing mode,
   * allowing the user to edit the todo's title.
   *
   * @return {void}
   */
  const handleEditClick = () => {
    setIsEditing(true);
  };

  /**
   * handleSaveClick updates the todo's title when the user clicks "Save".
   * It prevents saving an empty title or a title that hasn't changed.
   *
   * @param {Event} e - The event object from form submission
   * @return {void}
   */
  const handleSaveClick = (e) => {
    e.preventDefault();

    if ('' === newTitle) {
      setIsEditing(false);
      return;
    }

    const oldTitle = todo?.title || 'Untitled';

    if (newTitle === oldTitle) {
      setIsEditing(false);
      return;
    }

    updateTodo(todo.id, newTitle);
    setIsEditing(false);
  };

  /**
   * handleStatusToggle toggles the completion status of the todo.
   * It calls the toggleTodoStatus function to update the is_Done state.
   *
   * @return {void}
   */
  const handleStatusToggle = () => {
    toggleTodoStatus(todo.id);
  };

  /**
   * handleCancelPress cancels the editing mode,
   * discarding any changes made to the todo title and resetting it to the original title.
   *
   * @return {void}
   */
  const handleCancelPress = () => {
    const oldTitle = todo?.title || 'Untitled';
    setNewTitle(oldTitle);
    setIsEditing(false);
  };

  /**
   * handleDeleteClick deletes the todo by calling the deleteTodo function.
   *
   * @return {void}
   */
  const handleDeleteClick = () => {
    deleteTodo(todo.id);
  };

  /**
   * handleTitleChange updates the newTitle state when the user types in the input field.
   *
   * @param {Event} e - The event object from input change
   * @return {void}
   */
  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  return (
    <li className={`todo-item ${todo.is_Done ? 'todo-completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleSaveClick}>
          <input
            type="text"
            aria-label="Update Todo"
            value={newTitle}
            onChange={handleTitleChange}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancelPress}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p>{todo.title}</p>
          <div className="buttons-container">
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleStatusToggle}>{todo.is_Done ? 'Not Done' : 'Done'}</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}

export default EachTodo;
