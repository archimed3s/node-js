const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

http.createServer(function (request, response) {
  const urlParsed = url.parse(request.url, true);

  response.writeHead(200, { 'Content-Type': 'text/plain' });

  if (urlParsed.query.message) {
    response.write(urlParsed.query.message);
  } else {
    response.write('not found');
  }

  request.pipe(response);
}).listen(8081);

console.log('Server running http://localhost:8081/');