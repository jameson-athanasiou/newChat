const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.dev');
const compiler = webpack(webpackConfig);
const app = express();
const http = require('http').Server(app);

const authentication = require('./authServer');
const message = require('./messageServer');
const socketServer = require('./socketServer');
const user = require('./userServer');

const socket = new socketServer(http);
socket.start();

const port = 8080;

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

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/'
}));
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
