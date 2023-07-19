const http = require('http');
global.projectPath = __dirname + '/';
const serverHandler = require('./core/serverHandler.js');
http.createServer(serverHandler).listen(8000);