/**
 * Created by Halo on 16/3/9.
 */

"use strict"
var expressApp = require('./expressSet');
var tcpServer = require('./tcpSet');

/*exports.start = function(){
    set.start();
}*/

exports.appServer = expressApp;
exports.tcpServer = tcpServer;
