const webpack = require('webpack');
const path = require('path');

module.exports = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        contentBase: './app',
        port: 7749
    },
    entry: [
        path.resolve(__dirname, 'app/index.jsx')
    ],
    output: {
        path: path.resolve(__dirname, 'app/build'),
        publicPath: '/',
        filename: './bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
