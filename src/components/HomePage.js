import React from 'react';
import Button from './Button';
import ConversationArea from './ConversationArea';
import io from 'socket.io-client';
import TextBox from './TextBox';
import * as service from '../service/message';


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

    sendMessage () {
        service.sendMessage(this.state.text);
    }

    handleTextInput(event) {
        this.setState({
            text: event.target.value
        });
    }

    _addWatches() {
        this.socket.on('message', data => {
            const receivedMessages = this.state.receivedMessages;
            receivedMessages.push(data);
            this.setState({
                receivedMessages
            });
        });
    }

    render() {
        return <div>
                <TextBox onChange={this.handleTextInput.bind(this)}/>
                <Button onClick={this.sendMessage.bind(this)} />
                <ConversationArea messages={this.state.receivedMessages} />
              </div>;
    }
}
