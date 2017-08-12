import React from 'react';
import Button from 'src/components/Button';
import ChatForm from 'src/components/ChatForm';
import ConversationArea from 'src/components/ConversationArea';
import io from 'socket.io-client';
import userService from 'src/service/user';

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            receivedMessages: [],
            text: ''
        }
        this.socket = io();
        this._addWatches();
    }

    updateUsername() {
        const userInput = window.prompt('What do you want your username to be?');
        userInput && userService.updateUsername(userInput);
    }

    _addWatches() {
        this.socket.on('message', data => {
            this._updateMessages(data)
        });
    }

    _updateMessages(data) {
        const receivedMessages = this.state.receivedMessages;
        receivedMessages.push(data);
        this.setState({
            receivedMessages
        });
    }

    render() {
        return <div>
            <Button
                className="btn-username"
                onClick={this.updateUsername.bind(this)}
                text="Change Username"
            />
            <ConversationArea
                messages={this.state.receivedMessages}
            />
            <ChatForm />
            </div>;
    }
}
