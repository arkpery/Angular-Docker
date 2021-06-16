const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    res.end(fs.readFileSync(`/home/node/app/index.html`));
}).listen(80);
