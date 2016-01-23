/**
 * Created by Halo on 16/1/23.
 */

var http = require('http');
//console.log(http);
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello World</p>');
}).listen(8118);
console.log('server start on 8118 ...');
