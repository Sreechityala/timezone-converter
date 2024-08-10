// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CustomThemeProvider from './ThemeContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
