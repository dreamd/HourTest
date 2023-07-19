const fs = require('fs');
const common = require('./common.js');
module.exports = (request, response) => {
    let searchFolder = '', searchExt = '', searchPath = '', input = '', isController = false;
    serverUrl = request.url.toLowerCase().substr(1).replace('..', '');
    serverUrl = serverUrl ? serverUrl : 'index.html';
    switch (request.method) {
        case 'GET': {
            if (serverUrl.substr(0, 6) !== 'share/') {
                searchFolder = 'public/';
            }
            break;
        }
        case 'POST': {
            searchFolder = 'app/controller/';
            searchExt = '.js';
            isController = true;
            break;
        }
    }
    searchPath = global.projectPath + searchFolder + serverUrl + searchExt;
    if (fs.existsSync(searchPath)) {
        request.on('data', chunk => {
            input += chunk;
        });
        request.on('end', () => {
            input = JSON.parse(input ? input : '{}');
            if (!isController) {
                fs.readFile(searchPath, (err, data) => {
                    if (!err) {
                        const ext = searchPath.substr(searchPath.lastIndexOf('.') + 1);
                        response.writeHead(200, {'Content-Type': common.extToContentType(ext)});
                        response.end(data);
                    }
                });
            } else {
                const controller = require(searchPath);
                controller(input, request, response);
            }
        })
        return;
    }
    response.writeHead(500);
    response.end();
};