import React from 'react';

export default class TextBox extends React.Component {

    constructor(props) {
        super(props);
    }

    _handleKeyPress(e) {
        this.props.onKeyPress && this.props.onKeyPress(e.key, this.state.focused);
    }

    _onFocus() {
        this.setState({ focused: true })
    }

    _onBlur() {
        this.setState({ focused: false })
    }

    render() {
        return <input
            className={this.props.className}    
            type="textbox"
            onChange={this.props.onChange}
            onFocus={this._onFocus.bind(this)}
            onBlur={this._onBlur.bind(this)}
            onKeyPress={this._handleKeyPress.bind(this)}
            value={this.props.value}
        ></input>;
    }
}
