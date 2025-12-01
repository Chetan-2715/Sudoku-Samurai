import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import ErrorBoundary from './components/ErrorBoundary';

console.log("🚀 Sudoku Samurai App Starting...");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);