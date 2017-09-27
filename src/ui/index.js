// import font_aws from 'font-awesome/css/font-awesome.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import socket from './components/socket.js';

ReactDOM.render(
  <App socket={socket}/>,
  document.getElementById('root')
);
