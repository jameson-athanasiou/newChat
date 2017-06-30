const clientStore = require('./clientStore');

module.exports =  function (request, response) {
    request.on('data', data => {
       const payload = JSON.parse(data.toString());
       const client = clientStore.getClientById(payload.id);

       if (client) {
           if (clientStore.getClientByUserName(payload.username)) {
               response.status(304);
               response.end();
           } else {
               client.username = payload.username;
               response.status(200).send({
                   client: client.id,
                   username: client.username
               });
               response.end();
           }
       } else {
           response.writeHead(404);
           response.end();
       }
   });
}
