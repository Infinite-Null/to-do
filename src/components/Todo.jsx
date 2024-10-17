import React, { useRef, useState } from 'react';
import useTodo from '../hooks/useTodo';
import TodoForm from './TodoForm';
import EachTodo from './EachTodo';
import '../assets/css/Todo.css';

const TODO_FILTERS = {
    ALL: 'all',
    PENDING: 'pending',
    COMPLETED: 'completed'
};

/**
 * Todo component manages the overall todo list, including adding, updating,
 * toggling the status of, and deleting todos. It also provides filtering
 * functionality to display all, pending, or completed todos.
 *
 * @component
 * @returns {JSX.Element} A rendered Todo App with form, tabs, and todo list.
 */
function Todo() {
    const { todos, addTodo, updateTodo, toggleTodoStatus, deleteTodo } = useTodo();
    const [activeTab, setActiveTab] = useState(TODO_FILTERS.ALL);
    const inputRef = useRef(null);

    /**
     * filteredTodos filters the todo list based on the active tab.
     * If 'all' is selected, it returns all todos.
     * If 'pending' is selected, it returns only the todos that are not completed.
     * If 'completed' is selected, it returns only the completed todos.
     *
     * @return {Array} Filtered array of todos based on the active tab.
     */
    const filteredTodos = todos.filter((todo) => {
        if (TODO_FILTERS.PENDING === activeTab) {
            return !todo.isDone;
        }

        if (TODO_FILTERS.COMPLETED === activeTab) {
            return todo.isDone;
        }

        return true;
    });

    /**
     * renderTodos renders the list of filtered todos.
     * If no todos exist for the active filter, it displays a message.
     * Otherwise, it maps through the filtered todos and renders EachTodo components.
     *
     * @return {JSX.Element} List of filtered todos or a message when no todos exist.
     */
    const renderTodos = () => {
        return filteredTodos.map((todo) => (
            <EachTodo
                key={todo.id}
                todo={todo}
                inputRef={inputRef}
                updateTodo={updateTodo}
                toggleTodoStatus={toggleTodoStatus}
                deleteTodo={deleteTodo}
            />
        ));
    };

    return (
        <>
            <header>
                <h1 className="todo-heading">Todo App</h1>
                <p className="todo-description">Keep all your todo in one place</p>
            </header>
            <section className="todo-item-form-container">
                <TodoForm addTodo={addTodo} inputRef={inputRef} />
                <div className="todo-tabs">
                    <button
                        className={`tab-btn ${TODO_FILTERS.ALL === activeTab ? 'active' : ''}`}
                        onClick={() => setActiveTab(TODO_FILTERS.ALL)}>
                        {TODO_FILTERS.ALL.toUpperCase()}
                    </button>
                    <button
                        className={`tab-btn ${TODO_FILTERS.PENDING === activeTab ? 'active' : ''}`}
                        onClick={() => setActiveTab(TODO_FILTERS.PENDING)}>
                        {TODO_FILTERS.PENDING.toUpperCase()}
                    </button>
                    <button
                        className={`tab-btn ${TODO_FILTERS.COMPLETED === activeTab ? 'active' : ''}`}
                        onClick={() => setActiveTab(TODO_FILTERS.COMPLETED)}>
                        {TODO_FILTERS.COMPLETED.toUpperCase()}
                    </button>
                </div>
            </section>
            {1 > filteredTodos.length ? (
                <p className="empty-todo">
                    No {TODO_FILTERS.ALL === activeTab ? '' : activeTab} Todo!
                </p>
            ) : (
                <ul className="todo-list">{renderTodos()}</ul>
            )}
        </>
    );
}

export default Todo;
