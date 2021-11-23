function createErrResponse(res, status, message) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ message }));
  res.end();
  return;
}

function createResponse(res, status, el) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(el));
  res.end();
}

module.exports = { createErrResponse, createResponse };
