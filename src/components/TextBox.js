import React from 'react';

export default class TextBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <input type="textbox" onChange={this.props.onChange}></input>;
    }
}
