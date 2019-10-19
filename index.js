/* global require */
/* eslint-env es6 */
/* eslint no-unused-vars: [0, { "args": "none" }] */

var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');
const mime = require('mime');

var handleError = function(err, res) {
  res.writeHead(404, {
    'Content-Type': 'text/html'
  });
  fs.readFile('./app/error.html', function(err, data) {
    res.end(data);
  });
};

var server = http.createServer(function(req, res) {
  console.log('Responding to a request.');
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    }
  });
  var mimeType = mime.getType(filePath);
  console.log('The MIME Type is: ' + mimeType);
});
server.listen(3000);
