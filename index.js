const http = require('http');
require('dotenv').config();

const port = process.env.HOST_PORT;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'text/plain' });
  res.end('work');
});

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
