const http = require('http');
const url = require('url');
const { STATUS } = require('./entities/constants');
const { DB } = require('./entities/db');
const { Method } = require('./entities/enum');
const { createResponse, createErrResponse } = require('./helpers/helpers');
const { parseReqPath } = require('./helpers/parser');
require('dotenv').config();

const db = new DB();

const server = http.createServer((req, res) => {
  process.on('uncaughtException', function (err) {
    createErrResponse(res, STATUS.servErr, err?.message || 'oops');
  });

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
      let r = '';

      req.on('data', (data) => {
        r += data;
      });

      req.on('end', () => {
        try {
          const el = db.set(JSON.parse(r));
          createResponse(res, STATUS.created, el);
        } catch (err) {
          if (err.isCustom) {
            createErrResponse(res, err.status, err.message);
            return;
          }
          createErrResponse(res, STATUS.servErr, err.message);
        }
      });
      break;

    case Method.put:
      let putRes = '';
      req.on('data', (data) => {
        putRes += data.toString();
      });
      req.on('end', () => {
        try {
          const el = db.update(reqParams.id, JSON.parse(putRes));
          createResponse(res, STATUS.ok, el);
        } catch (err) {
          if (err.isCustom) {
            createErrResponse(res, err.status, err.message);
            return;
          }
          createErrResponse(res, STATUS.servErr, err.message);
        }
      });
      break;
    case Method.del:
      try {
        db.remove(reqParams.id);
        createResponse(res, STATUS.deleted, {
          message: `${reqParams.id} was removed successfully`,
        });
      } catch (err) {
        if (err.isCustom) {
          createErrResponse(res, err.status, err.message);
          return;
        }
        createErrResponse(res, STATUS.servErr, err.message);
      }
      break;

    default:
      createErrResponse(res, STATUS.notImpl, {
        message: `not expected request method ${req.method}`,
      });
      break;
  }
});

module.exports = server;
