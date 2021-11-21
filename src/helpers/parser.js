function parseReqPath(path) {
  const pathArr = path
    .replace(/\s/g, '')
    .replace(/\//g, ' ')
    .split(' ')
    .filter((n) => n);
  return {
    type: pathArr[0],
    id: pathArr[1],
  };
}

function reqIsCurrect(path, len = 2) {
  const slicedPath = path.split('/').slice(1);
  return slicedPath.length <= len;
}

module.exports = { parseReqPath, reqIsCurrect };
