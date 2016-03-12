/**
 * Created by Halo on 16/3/12.
 */

"use strict"

var loginFilter = require('./loginFilter');

module.exports = function(app){
    app.use(loginFilter);
}
