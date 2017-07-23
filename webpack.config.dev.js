const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        app: './src/index.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            include: [
                path.join(__dirname, 'src'),
                path.join(__dirname, 'test')
            ],
        }]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Chat',
          template: './index.html'
        })
    ]
};
