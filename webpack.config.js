/* eslint-disable */

var webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './public/_primary.js',
    ],
    output: {
        path: require("path").resolve("./dist"),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ['es2015', 'react', 'react-hmre', 'stage-1']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            { 
                test: [/\.png$/, /\.eot$/, /\.woff2$/, /\.woff$/, /\.ttf$/, /\.svg$/],
                loader: 'url' 
            }

        ]
    },
    watch: true
}