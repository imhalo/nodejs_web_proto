/**
 * Created by Halo on 16/3/8.
 */

"use strict"
var cluster = require('cluster');
var os = require('os');
var config = require('./config');
var server = require('./zengine').appServer;

class Start{
    constructor(){

    }
    start(){
        if(config.isCluster && cluster.isMaster){
            var cpus = os.cpus();
            cpus.forEach(() => {
                var wk = cluster.fork();
                console.log('started a new wk wkid:'+wk.process.pid);
            });
        }else{
            server.start();
        }
    }
}

var starter = new Start();
starter.start();