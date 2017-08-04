const authentication = require('./authServer');
const bodyParser = require('body-parser');
const express = require('express');
const message = require('./messageServer');
const socketServer = require('./socketServer');
const path = require('path');
const user = require('./userServer');

const app = express();
const http = require('http').Server(app);
const socket = new socketServer(http);

const port = process.env.PORT || 8080;

socket.start();

const serviceMap = {
    authentication: {
        url: '/authenticate',
        cb: authentication
    },
    message: {
        url: '/message',
        cb: message.bind(null, socket.getSocketIoInsance())
    },
    userManagement: {
        url: '/user',
        cb: user
    }
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', express.static(path.resolve('dist')));

_setupEndpoints();

//setup endpoints
function _setupEndpoints() {
    Object.keys(serviceMap).forEach(endpointType => {
        const endpointInfo = serviceMap[endpointType];
        if (endpointInfo) {
            app.use(endpointInfo.url, endpointInfo.cb);
        }
    });
}

http.listen(port);
console.log(`Server listening on port ${port}`);
