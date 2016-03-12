/**
 * Created by Halo on 16/3/12.
 */

"use strict"

module.exports = function(app){
    app.get('/', function(req, res){
        console.log(req.sessionID);
        var session = req.session;
        if(session.count){
            session.count++;
        }else{
            session.count = 1;
        }
        res.send('index! count:'+session.count);
    });
}