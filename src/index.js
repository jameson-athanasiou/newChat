import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage'; // eslint-disable-line no-unused-vars
import socketHandler from './service/socketHandler';
import auth from 'src/service/auth';

auth.authenticateUser();

ReactDOM.render(
  <HomePage />,
  document.getElementById('root')
);

socketHandler.start();
