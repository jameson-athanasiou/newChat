const Server = require('karma').Server;
const args = require('minimist')(process.argv.slice(2));
const paths = require('../config/paths');

const config = {
    configFile: paths.appConfig + '/karma.conf.js'
};

if (args.debug) {
    config.singleRun = false;
}

new Server(config, function (exitCode) {
    console.log(`Karma has exited with code: ${exitCode}`);
    process.exit(exitCode);
}).start();
