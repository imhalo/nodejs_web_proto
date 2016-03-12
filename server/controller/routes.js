/**
 * Created by Halo on 16/3/9.
 */

"use strict"


var indexController = require('./indexController');
var userController = require('./userController');

module.exports = function(app){
    indexController(app);
    userController(app);
}
