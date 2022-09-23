import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
import App from './components/app';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './utils/context/authContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
