var http = require('http');
var cookie = require('cookie');

http.createServer(function(request, response){

    var cookies = cookie.parse(request.headers.cookie);
    console.log(cookies['yummy_cookie']);

    response.writeHead(200, {
        'Set-Cookie': ['yummy_cookie=choco', 'tasty_cookie=strawberry']
    });
    response.end("cookies!!!!");
}).listen(3000);