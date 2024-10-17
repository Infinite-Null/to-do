import React, { useState } from 'react';
import '../assets/css/TodoForm.css';
import Alert from './Alert';

/**
 * TodoForm component handles adding new todo items.
 * It provides an input field for the user to enter a new todo and submit it.
 * Once submitted, the input field is cleared.
 *
 * @component
 * @param {Function} addTodo - Function to add a new todo item to the list.
 * @returns {JSX.Element} A form to add new todo items.
 */
function TodoForm({ addTodo, inputRef }) {
    const [title, setTitle] = useState('');
    const [alert, setAlert] = useState({ isOpen: false, message: '', type: 'error' });

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
        if (!title.trim()) {
            setTitle('');
            setAlert({
                isOpen: true,
                message: 'Please enter a todo title',
                type: 'error'
            });
            return;
        }

        addTodo(title.trim());
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

    /**
     * Closes the alert modal by updating the alert state.
     *
     * @returns {void}
     */
    const closeAlert = () => {
        inputRef.current.focus();
        setAlert({ ...alert, isOpen: false });
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <label htmlFor="todo-title">New Todo:</label>
            <input
                ref={inputRef}
                autoFocus
                required
                type="text"
                id="todo-title"
                value={title}
                onChange={handleChange}
                placeholder="Enter your task"
            />
            <button type="submit">Add Todo</button>
            <Alert
                isOpen={alert.isOpen}
                message={alert.message}
                type={alert.type}
                onClose={closeAlert}
            />
        </form>
    );
}

export default TodoForm;
