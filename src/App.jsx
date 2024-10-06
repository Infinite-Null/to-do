import './assets/css/App.css';
import Todo from './components/Todo';

/**
 * The App component serves as the root component of the application.
 * It imports and renders the Todo component, which handles all the functionality
 * related to managing a todo list.
 *
 * @component
 * @returns {JSX.Element} The rendered Todo component.
 */
function App() {
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default App;
