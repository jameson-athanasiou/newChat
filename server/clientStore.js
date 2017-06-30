const chalk = require('chalk');

module.exports = new class clientStore {

    constructor() {
        this._clients = [];
        this._idMax = 10000;
        this._idMin = 1000;
        this._idPrefix = 'CHAT-';
    }

    addClient() {
        let newClientId = this._generateNewClientId();
        while (this.getClientById(newClientId)) {
            newClientId = this._generateNewClientId();
        }
        const client = {
            id: newClientId
        };
        this._clients.push(client);
        console.log(chalk.yellow(`New Client Created: ${client.id}`));
        return client;
    }

    getClients() {
        return this._clients;
    }

    getClientById(clientId) {
        return this._clients.find(client => client.id === clientId);
    }

    getClientByUserName(name) {
        return this._clients.find(client => client.userName === name);
    }

    _generateNewClientId() {
        return this._idPrefix + (Math.floor(Math.random() * (this._idMax - this._idMin)) + this._idMin);
    }

    sortClients() {
        this._clients.sort();
    }
}
