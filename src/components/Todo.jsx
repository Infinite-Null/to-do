import React, { useState } from 'react';
import useTodo from '../hooks/useTodo';
import TodoForm from './TodoForm';
import EachTodo from './EachTodo';
import '../assets/css/Todo.css';

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
  const [activeTab, setActiveTab] = useState('all');

  /**
   * filteredTodos filters the todo list based on the active tab.
   * If 'all' is selected, it returns all todos.
   * If 'pending' is selected, it returns only the todos that are not completed.
   * If 'completed' is selected, it returns only the completed todos.
   *
   * @return {Array} Filtered array of todos based on the active tab.
   */
  const filteredTodos = todos.filter((todo) => {
    if ('pending' === activeTab) {
      return !todo.is_Done;
    }

    if ('completed' === activeTab) {
      return todo.is_Done;
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
        <TodoForm addTodo={addTodo} />
        <div className="todo-tabs">
          <button
            className={`tab-btn ${'all' === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}>
            All
          </button>
          <button
            className={`tab-btn ${'pending' === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}>
            Pending
          </button>
          <button
            className={`tab-btn ${'completed' === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}>
            Completed
          </button>
        </div>
      </section>
      {1 > filteredTodos.length ? (
        <p className="empty-todo">No {'all' === activeTab ? '' : activeTab} Todo!</p>
      ) : (
        <ul className="todo-list">{renderTodos()}</ul>
      )}
    </>
  );
}

export default Todo;
