import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App';
import { AppProvider } from './context';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
