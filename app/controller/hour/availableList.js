const shareCommon = require(global.projectPath + 'share/common.js');
module.exports = (input, request, response) => {
    const from = Math.floor((Math.random() * 23) + 1),
    randomToList = [];
    for (let i = 0; i <= 23; i++) {
        if (i !== from) {
            randomToList.push(i);
        }
    }
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify({
        from: from,
        to: randomToList[Math.floor((Math.random() * randomToList.length - 1) + 1)]
    }));
};