const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './example/index.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
    },
    resolve: {
        alias: {
            'data-bind': path.join(__dirname, '../lib/index.js')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'databind',
            template: './example/index.html',
            filename: 'index.html',
            chunks: ['index'],
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}
