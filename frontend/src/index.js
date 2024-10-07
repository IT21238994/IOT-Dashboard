import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Optional: custom CSS styles
import App from './App';  // Main App component

// Render the App component into the root div in index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
