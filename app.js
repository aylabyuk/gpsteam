/* eslint-disable */

var express = require('express')
var path = require('path')
var config = require('./webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist'));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render("index");
});

var port = 3000

app.listen(port, function () {
    console.log('listening to this joint on port '+ port);
});

///server side velocity computation

app.get('/compute', function (req, res) {
    let PythonShell = require('python-shell');
    let pyshell = new PythonShell('./compute_input.py', { mode: 'json' });

    let data = req.query

    pyshell.options

    pyshell.send(data)

    pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
        res.send(message)
        // console.log(message);
    });

    // end the input stream and allow the process to exit
    pyshell.end(function (err) {
        if (err) throw err;
        console.log('finished');
    });

})
