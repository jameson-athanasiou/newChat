import io from 'socket.io-client';

export default class socketHandler() {

    constructor() {
        this.socket = io();
    }

    start() {
        this._addSockets();
    }

    _addSockets() {
        this.socket.on('message', _handleReceivedMessage.bind(this, data));
    }

    _handleReceivedMessage(data) {
        console.info(data);
    }
}
