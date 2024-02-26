const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    entry: './src/script.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    }
};