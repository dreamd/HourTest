module.exports = {
    'extToContentType': (ext) => {
        const contentTypeList = {
            'html': 'text/html',
            'css': 'text/css',
            'js': 'text/javascript',
            'ico': 'image/x-icon'
        };
        if (!!contentTypeList[ext]) {
            return contentTypeList[ext];
        }
        return 'text/plain';
    }
};