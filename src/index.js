// This is the entry point for the React app.
// It renders the App component and sets up Redux for state management.
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './components/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

// Create the root and render the app inside a Redux Provider.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

// Start measuring web performance (optional).
reportWebVitals();
