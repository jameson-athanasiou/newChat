const clientStore = require('./clientStore');

module.exports = function (request, response) {
    const newClient = clientStore.addClient();
    response.status(201).send(newClient);
    response.end();
    clientStore.sortClients();
}
