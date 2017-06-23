import $ from 'jquery';
import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

const button = $('button');
const input = $('input');
const socket = io();

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);

let key = null;
let messages = [];

$.ajax({
    "method": "GET",
    "url": "/auth",
}).done(function(data) {
    console.info(data);
    if (data) {
        key = data;
    }
});


function handleReceivedMessage(data) {
    const displayNode = $('#log ul');
    //const fullHtmlString = '<li>' + data.client + ' says: ' + data.message + '</li>';
    const fullHtmlString = `<li>${data.client} says: ${data.message}</li>`;
    displayNode.append(fullHtmlString);
}

function sendMessage() {
    const message = input.val();
    $.ajax({
        "Content-Type": "application/json",
        "method": "POST",
        "url": "/message",
        "data": {
            "message": message,
            "client": key
        }
    }).done(function(data) {
        //handleReceivedMessage(data);
    });
}

button.on("click", sendMessage);

socket.on('message', function (data) {
    handleReceivedMessage(data);
});
