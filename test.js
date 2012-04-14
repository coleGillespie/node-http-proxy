var http = require('http'),
    https = require('https'),
    httpProxy = require('./lib/node-http-proxy');

var server = httpProxy.createServer({
    target: { host: 'graph.facebook.com', port: 443, https: true },
    changeOrigin: true },
    function (req, res, proxy) {
        console.log("Received request.");
        server.proxy.response_buffer = '';
        proxy.proxyRequest(req, res);
});

server.proxy.on('data', function(data) {
    server.proxy.response_buffer += data;
});

server.proxy.on('end', function() {
    console.log(server.proxy.response_buffer);
}); 

server.listen(8000);
