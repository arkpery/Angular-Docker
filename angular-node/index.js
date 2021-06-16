const http = require("http");
const fs = require("fs");
const fileURLToPath = require("url").URL;

const middlewares = [
  (state, req, res) => {
    if (fs.existsSync(`${__dirname}/${req.path}`) &&
      fs.statSync(`${__dirname}/${req.path}`).isFile()) {
      state.apply = true;
    }
    res.end(fs.readFileSync(`${__dirname}/${req.path}`));
  },
  (state, req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.end(fs.readFileSync(`/home/node/app/index.html`));
  }
]

http.createServer((req, res) => {
    const state = {};

    for (let middleware of middlewares){
        middleware(state, req, res);
        if (state.apply){
            return;
        }
    }
}).listen(80);
