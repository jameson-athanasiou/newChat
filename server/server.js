const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/auth', function (req, res) {
    let key = 'CHAT-' + getRandom(1000, 10000);
    while (clients.includes(key)) {
        key = 'CHAT-' + getRandom(1000, 10000);
    }
    clients.push(key);
    res.writeHead(201);
    res.write(key);
    res.end();
});

app.use('/message', function (req, res) {
    console.log(req.body);
    if (clients.includes(req.body.client)) {
        const data = {
            client: req.body.client,
            message: req.body.message
        };
        res.writeHead(200);
        io.emit('message', data);
        res.end();
    } else {
        res.writeHead(403);
        res.end();
    }
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
