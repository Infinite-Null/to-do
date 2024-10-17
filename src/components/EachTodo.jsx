import React, { useEffect, useState } from 'react';
import ConfirmBox from '../components/ConfirmBox';
import '../assets/css/EachTodo.css';
import Alert from './Alert';

/**
 * EachTodo component is responsible for rendering a single todo item.
 * It provides functionality to edit, toggle status, and delete the todo.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.todo - The todo object containing its data (id, title, isDone).
 * @param {Function} props.updateTodo - Function to update the todo title.
 * @param {Function} props.toggleTodoStatus - Function to toggle the status of the todo (done or not done).
 * @param {Function} props.deleteTodo - Function to delete the todo.
 * @returns {JSX.Element} The rendered component for each todo item.
 */
function EachTodo({ todo, updateTodo, toggleTodoStatus, deleteTodo, inputRef }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo?.title || 'Untitled');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [alert, setAlert] = useState({ isOpen: false, message: '', type: 'error' });

    /**
     * handleEditClick switches the component to editing mode.
     *
     * @return {void}
     */
    const handleEditClick = () => {
        setIsEditing(true);
    };

    /**
     * handleSaveClick saves the updated title and exits editing mode.
     * If the title is empty or unchanged, it cancels the editing mode.
     *
     * @param {Event} e - The form submission event.
     * @return {void}
     */
    const handleSaveClick = (e) => {
        e.preventDefault();
        const oldTitle = todo?.title || 'Untitled';

        if ('' === newTitle.trim()) {
            setAlert({
                isOpen: true,
                message: 'Todo title cannot be empty',
                type: 'error'
            });
            setNewTitle(oldTitle);
            inputRef?.current?.focus();
            setIsEditing(false);
            return;
        }

        if (newTitle === oldTitle) {
            setAlert({
                isOpen: true,
                message: 'No changes made to todo title',
                type: 'warning'
            });
            setIsEditing(false);
            return;
        }

        updateTodo(todo.id, newTitle.trim());
        setIsEditing(false);
    };

    /**
     * handleStatusToggle toggles the completion status of the todo.
     *
     * @return {void}
     */
    const handleStatusToggle = () => {
        toggleTodoStatus(todo.id);
    };

    /**
     * handleCancelPress cancels the edit mode and reverts the title to its original value.
     *
     * @return {void}
     */
    const handleCancelPress = () => {
        const oldTitle = todo?.title || 'Untitled';
        setNewTitle(oldTitle);
        setIsEditing(false);
    };

    /**
     * handleDeleteClick shows the confirmation modal before deleting the todo.
     *
     * @return {void}
     */
    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
    };

    /**
     * handleDeleteConfirm confirms and proceeds with deleting the todo.
     *
     * @return {void}
     */
    const handleDeleteConfirm = () => {
        inputRef.current.focus();
        deleteTodo(todo.id);
        setShowDeleteConfirm(false);
    };

    /**
     * handleDeleteCancel hides the delete confirmation modal without deleting the todo.
     *
     * @return {void}
     */
    const handleDeleteCancel = () => {
        inputRef.current.focus();
        setShowDeleteConfirm(false);
    };

    /**
     * handleTitleChange updates the new title state as the user types in the input field.
     *
     * @param {Event} e - The input change event.
     * @return {void}
     */
    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
    };

    /**
     * Closes the alert modal by updating the alert state.
     *
     * @returns {void}
     */
    const closeAlert = () => {
        setAlert({ ...alert, isOpen: false });
    };

    useEffect(() => {
        if (!isEditing) {
            inputRef?.current?.focus();
        }
    }, [isEditing, inputRef]);

    return (
        <li className={`todo-item ${todo.isDone ? 'todo-completed' : ''}`}>
            {isEditing ? (
                <form onSubmit={handleSaveClick}>
                    <input
                        autoFocus
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
                        <button onClick={handleStatusToggle}>
                            {todo.isDone ? 'Not Done' : 'Done'}
                        </button>
                        <button onClick={handleDeleteClick}>Delete</button>
                    </div>
                </>
            )}

            <ConfirmBox
                isOpen={showDeleteConfirm}
                message={`Are you sure you want to delete "${todo.title}"?`}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
            <Alert
                isOpen={alert.isOpen}
                message={alert.message}
                type={alert.type}
                onClose={closeAlert}
            />
        </li>
    );
}

export default EachTodo;
