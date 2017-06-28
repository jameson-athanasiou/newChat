import React from 'react';

export default class ConversationArea extends React.Component {

    constructor(props) {
        super(props);
    }

    _mapMessages(messages) {
        return messages.map(message => {
            return <li> {message.author} says: {message.text} </li>;
        });
    }

    render() {
        return <ul>{this.props.messages.map((message, i) => {
           return <li key={i}> {message.username} says: {message.text} </li>
        })}</ul>; 
    }
}
