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

module.exports = {
    devtool: '#inline-source-map',
    entry: [
        path.resolve(__dirname, 'src/index.js')
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
                        use: ['css-loader?sourceMap', 'less-loader']
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
    plugins: [
        new ExtractTextPlugin('style.css'),
        new CopyWebpackPlugin([
            {from: "src/manifest.json", to: './'},
            {from: "src/index.html", to: './'},
            {from: 'src/assets/fonts', to: './fonts'}
        ]),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
};