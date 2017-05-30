/* eslint-disable */
var CompressionPlugin = require("compression-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

var isProd = process.env.NODE_ENV === 'production'

module.exports = {
    devtool: 'source-map',
    entry: [
        'react-hot-loader/patch',
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
                test: /\.sass$/,
                use: [
                    'style-loader',
                    'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]',
                    'postcss-loader',
                    `sass-loader?precision=10&indentedSyntax=sass`,
                ]
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
        publicPath: '/',
        historyApiFallback: true,
        port: 8080
    }
}

// process.traceDeprecation = true