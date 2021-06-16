const http = require("http");
const fs = require("fs");
const fileURLToPath = require("url").URL;

const middlewares = [
  (state, req, res) => {
    if (fs.existsSync(`${__dirname}/../app${req.url}`) &&
      fs.statSync(`${__dirname}/../app${req.url}`).isFile()) {
      state.apply = true;

      res.end(fs.readFileSync(`${__dirname}/../app${req.url}`));
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
