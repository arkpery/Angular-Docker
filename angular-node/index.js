const http = require("http");
const fs = require("fs");

const middlewares = [
  (state, req, res) => {
    if (req.url === '/') {
      req.url = "/index.html";
    }
    if (fs.existsSync(`/home/node/app${req.url}`) &&
      fs.statSync(`/home/node/app${req.url}`).isFile()) {
      state.apply = true;

      res.end(fs.readFileSync(`/home/node/app${req.url}`));
    } else {
      state.apply = false;
    }
  },
  (state, req, res) => {
    state.apply = true;
    res.setHeader("Content-Type", "text/html");
    res.end(fs.readFileSync(`/home/node/app/index.html`));
  }
]

http.createServer((req, res) => {
  const state = {};

  for (let middleware of middlewares) {
    middleware(state, req, res);
    if (state.apply) {
      return;
    }
  }
}).listen(80);
