// Followed guide at https://medium.com/geekculture/scaling-node-js-applicationswith-pm2-clusters-c216c4468d66

const http = require("http");
http.createServer((req, res) => {
    res.writeHead(200);
    res.end("server endpoint hit");
}).listen(8080);