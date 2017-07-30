const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());

function resolvePath(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

module.exports = {
    appConfig: resolvePath('config'),
    appTest: resolvePath('test')
}
