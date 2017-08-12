import React from 'react';

export default class Button extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <button
                    className={this.props.className}    
                    onClick={this.props.onClick}
                >{this.props.text}</button>;
    }
}
