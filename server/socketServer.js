const socket = require('socket.io');

module.exports = class socketServer {
    constructor(httpServer) {
        this.io = socket(httpServer);
    }

    start() {
        this._watchUsers();
    }

    getSocketIoInsance() {
        return this.io;
    }

    _watchUsers() {
        this.io.on('connection', function(socket){
            console.log('a user connected');

            socket.on('disconnect', function(){
                console.log('user disconnected');
            });
        });
    }
}
