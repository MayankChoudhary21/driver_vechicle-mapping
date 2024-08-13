import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Optional: Contains global styles for the app
import App from './App';
import reportWebVitals from './reportWebVitals'; // Optional: Used for logging performance metrics

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Optional: Use reportWebVitals to log performance (can be omitted if not used)
reportWebVitals();
