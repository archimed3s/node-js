const http = require('http');
const fs = require('fs');
const path = require('path');

const htmlString = fs.readFileSync(path.join('.', 'index.html'), 'utf-8');
const template = htmlString.replace(/\{(.*?)\}/, "Hey, this is new title");

http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(template);
  response.end();

}).listen(8081);

console.log('Server running http://localhost:8081/');