/**
 * Created by Halo on 16/3/12.
 */

"use strict"

var paths = new Map();
paths.set('/login', true);

module.exports = function(req, res, next){
    var path = req.path;
    if(paths.get(path)){
        res.send('/login');
    }else{
        next();
    }
}