const path = require('path');
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        app: paths.src + '/index.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            include: [
                paths.src,
                paths.appTest
            ]
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(paths.appHome, 'dist')
    },
    resolve: {
        alias: {
            src: paths.src,
            test: paths.appTest,
            public: paths.public
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Chat',
          template: './index.html'
        })
    ]
};
