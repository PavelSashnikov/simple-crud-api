const uuidv = require('uuid');
const { DB_PATH, MESSAGE } = require('../entities/constants');
const { NotFoundErr, ValidateErr } = require('../entities/err');

function parseReqPath(path) {
  const pathArr = path
    .replace(/\s/g, '')
    .replace(/\//g, ' ')
    .split(' ')
    .filter((n) => n);

  if (!DB_PATH.includes(pathArr[0])) {
    throw new NotFoundErr(MESSAGE.notFound);
  } else if (pathArr[1] && !uuidv.validate(pathArr[1])) {
    throw new ValidateErr(MESSAGE.noValidId)
  }
    return {
      type: pathArr[0],
      id: pathArr[1],
    };
}

module.exports = { parseReqPath };
