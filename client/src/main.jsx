import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { WorkoutProvider } from './contexts/WorkoutContext.jsx';
import { AuthContexProvider } from './contexts/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContexProvider>
      <WorkoutProvider>
        <App />
      </WorkoutProvider>
    </AuthContexProvider>
  </React.StrictMode>
);
