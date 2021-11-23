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
const db = new DB();

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  let reqParams;
  try {
    reqParams = parseReqPath(reqUrl.pathname);
  } catch (err) {
    if (err.isCustom) {
      createErrResponse(res, STATUS.notFound, err.message);
      return;
    }
    createErrResponse(res, STATUS.servErr, err.message);
    return;
  }

  switch (req.method) {
    case Method.get:
      try {
        const el = db.getElById(reqParams.id);
        createResponse(res, STATUS.ok, el);
      } catch (err) {
        if (err.isCustom) {
          createErrResponse(res, err.status, err.message);
          return;
        }
        createErrResponse(res, STATUS.servErr, err.message);
      }
      break;

    case Method.post:
      try {
        const el = db.set(reqUrl.query);
        createResponse(res, STATUS.created, el);
      } catch (err) {
        if (err.isCustom) {
          createErrResponse(res, err.status, err.message);
          return;
        }
        createErrResponse(res, STATUS.servErr, err.message);
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
