import io from 'socket.io-client';

export default new class socketHandler {

    constructor() {
        this.socket = io();
    }

    start() {
        this._addSockets();
    }

    _addSockets() {
       // this.socket.on('message', this._handleReceivedMessage.bind(this));
    }

    _handleReceivedMessage(data) {
        debugger;
        this.socket.emit('messageReceived', data);
    }
}
