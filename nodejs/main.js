var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    console.log(_url);

    var queryData = url.parse(_url, true).query;
    console.log(_url);

    if(request.url == '/main'){
      _url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
      return response.writeHead(404);
    }

    response.writeHead(200);
    console.log(queryData.id);
    console.log(_url);
    response.end(fs.readFileSync(__dirname + _url));
 
});

app.listen(3000);