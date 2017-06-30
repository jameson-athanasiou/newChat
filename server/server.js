const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.dev');

const compiler = webpack(webpackConfig);
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 8080;

const clients = [];

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/auth', function (req, res) {
    let key = 'CHAT-' + getRandom(1000, 10000);
    while (clients.find(client => client.key === key)) {
        key = 'CHAT-' + getRandom(1000, 10000);
    }
    clients.push({key});
    res.status(201).send({key});
    res.end();
});

app.use('/user', function (req, res) {
    req.on('data', data => {
        const payload = JSON.parse(data.toString());
        const client = clients.find(client => client.key === payload.client);

        if (client) {
            if (clients.some(client => client.username === payload.username)) {
                res.status(304);
                res.end();
            } else {
                client.username = payload.username;
                res.status(200).send({
                    client: client.key,
                    username: client.username
                });
                res.end();
            }
        } else {
            res.writeHead(404);
            res.end();
        }
    });
});

app.use('/message', function (req, res) {
    req.on('data', data => {
        const payload = JSON.parse(data.toString());
        const client = clients.find(client => client.key === payload.client);
        if (client) {
            const data = {
                author: client.key,
                username: client.username,
                text: payload.message
            };
            res.writeHead(200);
            io.emit('message', data);
            res.end();
        } else {
            res.writeHead(403);
            res.end();
        }
    });
});

app.use('/', express.static(path.resolve('dist')));

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});


http.listen(port);

console.log(`Server listening on port ${port}`);
