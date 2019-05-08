const path = require('path');
const HtmlWebpackPLugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './starter/dist/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    // mode: 'development' we can move this to node scripts
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPLugin({
            filename: 'index.html',
            template: './starter/dist/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};