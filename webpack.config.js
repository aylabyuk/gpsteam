/* eslint-disable */
var CompressionPlugin = require("compression-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production'

module.exports = {
    devtool: 'source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './public/index.js',
        ],
    output: {
        path: require("path").resolve("./dist"),
        filename: 'app.bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'GPS PROJECT',
            favicon: './favicon.ico',
            template: './views/index.ejs',
            minify: {
                collapseWhitespace: true
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                   'style-loader',
                   'css-loader'
                ]
            },
            {
                test: [/\.png$/, /\.eot$/, /\.woff2$/, /\.woff$/, /\.ttf$/, /\.svg$/],
                loader: 'url-loader'
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: [
                        ['es2015', { "modules": false }],
                        'react','stage-1'],
                    plugins: ['react-hot-loader/babel']
                }
                
            }
        ]
    },
    devServer: {
        contentBase: require("path").join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        hot: true,
        publicPath: '/'
    }
}

// process.traceDeprecation = true