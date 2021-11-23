const { DB_PATH, MESSAGE } = require('../entities/constants');
const { NotFoundErr } = require('../entities/err');

function parseReqPath(path) {
  const pathArr = path
    .replace(/\s/g, '')
    .replace(/\//g, ' ')
    .split(' ')
    .filter((n) => n);

  if (!DB_PATH.includes(pathArr[0]) || pathArr.length > 2) {
    throw new NotFoundErr(MESSAGE.wrongPath);
  }
  return {
    type: pathArr[0],
    id: pathArr[1],
  };
}

module.exports = { parseReqPath };
