import React from 'react';

import Button from './Button';
import TextBox from './TextBox';
import * as service from '../service/message';


export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    sendMessage () {
        service.sendMessage(this.state.text);
    }

    handleTextInput(event) {
        this.setState({
            text: event.target.value
        });
    }

    render() {
        return <div>
                <TextBox onChange={this.handleTextInput.bind(this)}/>
                <Button onClick={this.sendMessage.bind(this)}/>
              </div>;
    }
}
