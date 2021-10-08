var path = require('path');
module.exports = {
    entry: './build/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    mode: "development",
};
