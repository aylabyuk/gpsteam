/* eslint-disable */

var express = require('express')
var path = require('path')
var config = require('./webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var favicon = require('serve-favicon');

var app = express();

app.use(favicon(__dirname + '/views/favicon.ico'));

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist'));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('*', function (req, res) {
    res.render("index");
});

var port = process.env.PORT || 8080

app.listen(port, function () {
    console.log('listening to this joint on port '+ port);
});
