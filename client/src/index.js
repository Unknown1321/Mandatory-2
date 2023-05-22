import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './app';

ReactDOM.render(
  <BrowserRouter>
    <ToastContainer />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


