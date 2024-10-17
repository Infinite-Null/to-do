import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * This file is the entry point of the React application.
 * It renders the App component into the root DOM element.
 * The application is wrapped in React.StrictMode to activate additional checks and warnings in development mode.
 */

// Create a root for rendering the React app into the DOM.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within the root element, with React.StrictMode enabled for detecting potential issues.
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
