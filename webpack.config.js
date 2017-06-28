const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let plugins = [
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([
        {from: "src/manifest.json", to: './'},
        {from: "src/index.html", to: './'},
        {from: 'src/assets/fonts', to: './fonts'}
    ])
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJSPlugin({
        compress: {
            warnings: false
        }
    }));
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));
}

module.exports = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        contentBase: './src',
        port: 7749
    },
    entry: [
        path.resolve(__dirname, 'src/index.jsx')
    ],
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '/',
        filename: './bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader', 'less-loader']
                    }
                )
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: plugins
};
