const http = require('http');
const path = require('path');
const url = require('url');
const { STATUS, MESSAGE } = require('./src/entities/constants');
const { DB } = require('./src/entities/db');
const { Method } = require('./src/entities/enum');
const { createResponse, createErrResponse } = require('./src/helpers/helpers');
const { parseReqPath } = require('./src/helpers/parser');
require('dotenv').config();

const port = process.env.PORT;

const server = http.createServer((req, res) => {
  const db = new DB();
  const reqUrl = url.parse(req.url, false);
  let reqParams;
  try {
    reqParams = parseReqPath(reqUrl.pathname);
  } catch (err) {
    createErrResponse(res, STATUS.notFound, err.message);
    return;
  }

  switch (req.method) {
    case Method.get:
      try {
        const el = db.getElById(reqParams.id);
        createResponse(res, STATUS.ok, el);
      } catch (err) {
        createErrResponse(res, STATUS.notFound, err.message);
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
