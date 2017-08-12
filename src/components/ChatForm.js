import Button from 'src/components/Button';
import * as messageService from 'src/service/message';
import React from 'react';
import TextBox from 'src/components/TextBox';

export default class ChatForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    clearMessage() {
        this.setState({
            text: ''
        });
    }

    sendMessage() {
        if (this.state.text.length) {
            messageService.sendMessage(this.state.text);
        }
        this.clearMessage();
    }

    handleTextInput(event) {
        this.setState({
            text: event.target.value
        });
    }

    onKeyPress(key, focused) {
        if (key === 'Enter' && focused) {
            this.sendMessage();
        }
    }

    render() {
        return <div className="chat-form">
            <TextBox
                className="txt-send-message"    
                onChange={this.handleTextInput.bind(this)}
                onKeyPress={this.onKeyPress.bind(this)}
                value={this.state.text}
            />
            <Button
                className="btn-send-message"    
                onClick={this.sendMessage.bind(this)}
                text="Send"
            /> 
            </div>
    }
}
