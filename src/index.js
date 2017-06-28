import $ from 'jquery';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage'; // eslint-disable-line no-unused-vars
import model from './model/model';
import socketHandler from './service/socketHandler';

ReactDOM.render(
  <HomePage />,
  document.getElementById('root')
);

socketHandler.start();

$.ajax({
    'method': 'GET',
    'url': '/auth',
}).done(function(data) {
    console.info(data);
    if (data) {
        model.key = data;
    }
});
