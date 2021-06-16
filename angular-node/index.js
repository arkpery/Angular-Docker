const http = require("http");
const fs = require("fs");
const fileURLToPath = require("url").URL;

const middlewares = [
  (state, req, res) => {
    const url = new URL(req.url);

    if (fs.existsSync(url.pathname) &&
      fs.statSync(url.pathname).isFile()) {
      state.apply = true;
    }
    res.end(fs.readFileSync(url.pathname));
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
