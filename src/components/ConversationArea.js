import React from 'react';

export default class ConversationArea extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return <ul className="conversation-area">
            {this.props.messages.map((message, i) => {
                return <li key={i}> {message.userName} says: {message.text} </li>
            })}
        </ul>; 
    }
}
