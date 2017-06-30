const clientStore = require('./clientStore');

module.exports = function (io, request, response) {
    request.on('data', data => {
        const payload = JSON.parse(data.toString());
        const client = clientStore.getClientById(payload.id);
        if (client) {
            const data = {
                author: client.id,
                username: client.username,
                text: payload.message
            };

            response.writeHead(200);
            io.emit('message', data);
            response.end();
        } else {
            response.writeHead(403);
            response.end();
        }
    });
};
