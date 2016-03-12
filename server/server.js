/**
 * Created by Halo on 16/3/8.
 * server engine || express
 */

"use strict"
var http = require('http');
var config = require('./config');
var cluster = require('cluster');
var os = require('os');

class Server {

    constructor(){
        this.config = config;
        this.httpServer = null;
    }

    createServer(){
        return new Promise((resolve, reject) => {
            let self = this;
            self.httpServer = new http.Server();
            resolve(self.httpServer);
        });
    }

    start(){
        var self = this;
        if(config.isCluster){
            var cpus = os.cpus();
            if(cluster.isMaster){
                console.log('isMaster...');

                cluster.on('listening',function(worker,address){
                    console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);
                });
                cpus.forEach((cpu) => {
                    var wk = cluster.fork();
                    console.log('started a new wk wkid:'+wk.process.pid);
                });

            }else{
                console.log('isWorker cluster.worker.id:'+cluster.worker.id+' process.pid:'+process.pid);

                self.createServer().then((httpServer) => {
                    httpServer.on('request', (request, response) => {
                        console.log('request...@'+process.pid);
                        response.writeHead(200, {'Content-Type': 'text/html'});
                        response.write('<h1>Node.js</h1>');
                        response.end('<p>Hello World</p>');
                    });
                    httpServer.listen(self.config.port);
                    httpServer.on('error', (error) => {
                        if (error.errno === 'EADDRINUSE') {
                            console.error(
                                '(EADDRINUSE) Cannot start server.',
                                'Port ' + self.config.port + ' is already in use by another program.',
                                'Is another node instance already running?'
                            );
                        } else {
                            console.error(
                                '(Code: ' + error.errno + ')',
                                'There was an error starting your server.'
                            );
                        }
                        process.exit(-1);
                    });
                    httpServer.on('connnention', () => {
                        // todo
                    });
                    httpServer.on('listening', () => {

                    })
                    console.log('server start, u can visit "http://localhot:'+self.config.port+'".');
                }).catch((err) => {
                    console.log('server start failed.');
                });
            }
        }else{

        }
    }

    pstart(){
        var self = this;
        self.createServer().then((httpServer) => {
            httpServer.on('request', (request, response) => {
                console.log('request...');
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write('<h1>Node.js</h1>');
                response.end('<p>Hello World</p>');
            });
            httpServer.listen(self.config.port);
            httpServer.on('error', (error) => {
                if (error.errno === 'EADDRINUSE') {
                    console.error(
                        '(EADDRINUSE) Cannot start server.',
                        'Port ' + self.config.port + ' is already in use by another program.',
                        'Is another node instance already running?'
                    );
                } else {
                    console.error(
                        '(Code: ' + error.errno + ')',
                        'There was an error starting your server.'
                    );
                }
                process.exit(-1);
            });
            httpServer.on('connnention', () => {
                // todo
            });
            httpServer.on('listening', () => {

            })
            console.log('server start, u can visit "http://localhot:'+self.config.port+'".');
        }).catch((err) => {
            console.log('server start failed.');
        });


    }
}
module.exports = new Server();



