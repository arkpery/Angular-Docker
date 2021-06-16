const http = require("http");

http.createServer((req, res) => {
    res.end(`/home/node/app/index.html`);
}).listen(80);