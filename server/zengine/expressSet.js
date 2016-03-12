/**
 * Created by Halo on 16/3/9.
 */

"use strict"

var http = require('http');
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var apps = require('./apps');
var config = require('../config');
var filters = require('../filter');
var routes = require('../controller/routes');

class ExpressSet {
    constructor(){
        this.app = apps.get('express');
        this.server = http.createServer(this.app);
        this.port = this.normalizePort(config.port || '8110');
    }

    start(){
        this.config();
        var server = this.server;
        server.listen(this.port);
        server.on('error', this.onError);
        server.on('listening', this.onListening);
    }

    config(){
        var app = this.app;

        // view engine setup
        app.set('views', path.join(__dirname, '../../views'));
        app.set('view engine', 'ejs');

        //静态文件访问
        app.use(express.static(path.join(__dirname, '../../public')));


        //sesion config memory
        app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true
        }));


        filters(app);   //过滤器
        routes(app);    //注入url
        // catch 404 and forward to error handler
        app.use(function(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // error handlers
        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use(function(err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });

    }



    /**
     * Normalize a port into a number, string, or false.
     */
    normalizePort(val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */
    onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    onListening() {
        var server = this;
        //console.log('sssss', this);
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        //debug('Listening on ' + bind);
        console.log('Listening on ' + bind);

    }
}

module.exports = new ExpressSet();
