/**
 * Created by Halo on 16/3/9.
 *
 */

"use strict"

var config = require('../config');
var express = require('express');
var http = require('http');

class App {

    constructor(){

    }

    /**
     *
     * @param appType
     * @return app
     *
     */
    get(appType){
        if(appType === 'express'){
            var app = express();
            return app;
        }else{
            var app = new http.Server();
            return app;
        }
    }
}

module.exports = new App();
