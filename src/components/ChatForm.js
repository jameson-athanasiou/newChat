import Button from 'src/components/Button';
import * as messageService from 'src/service/message';
import React from 'react';
import TextBox from 'src/components/TextBox';

export default class ChatForm extends React.Component {

    constructor(props) {
        super(props);
    }

    sendMessage () {
        messageService.sendMessage(this.state.text);
    }

    handleTextInput(event) {
        this.setState({
            text: event.target.value
        });
    }

    render() {
        return <div>
            <TextBox onChange={this.handleTextInput.bind(this)} />
            <Button onClick={this.sendMessage.bind(this)} text="Send" /> 
            </div>
    }
}
