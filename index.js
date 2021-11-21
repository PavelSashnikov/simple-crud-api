const http = require('http');
const path = require('path');
const url = require('url');
const { Method } = require('./src/entities/enum');
const { findEl, getAllData } = require('./src/helpers/dataWorker');
const { reqIsCurrect, parseReqPath } = require('./src/helpers/parser');
require('dotenv').config();

const port = process.env.PORT;

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, false);
  const reqParams = parseReqPath(reqUrl.pathname);
  switch (req.method) {
    case Method.get:
      if (reqParams.type) {
        const el = reqParams.id ? findEl(reqParams.id) : getAllData();
        if (!el) {
          res.writeHead(406, { 'Content-type': 'application/json' });
          res.write(JSON.stringify({ message: 'user not found' }));
          res.end();
        } else {
          res.writeHead(200, { 'Content-type': 'application/json' });
          res.write(JSON.stringify(el));
          res.end();
        }
      } else {
        res.writeHead(404, { 'Content-type': 'application/json' });
        res.end('is no Currect');
      }
      break;

    default:
      res.end(req.method);
      break;
  }
});

server.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
