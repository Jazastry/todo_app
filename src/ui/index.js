import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import socket from './components/socket.js';

ReactDOM.render(
  <App socket={socket}/>,
  document.getElementById('root')
);
