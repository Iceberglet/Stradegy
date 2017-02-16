var express = require('express');
var app = express();
var path = require('path');

const removeParam = (s)=>{
  while(s.indexOf('?') > 0){
    s = s.slice(0, s.indexOf('?'))
  }
  return s
}

// viewed at http://localhost:8080
app.get('/wireframe/*', function(req, res) {
  let p =removeParam(path.join(__dirname + req.url))
  console.log('GET Request For Wireframe Received')
  res.sendFile(p);
});

app.get('/app/*', function(req, res) {
  let p =removeParam(path.join(__dirname + req.url))
  console.log('GET Request For App Received')
  res.sendFile(p);
});

app.get('/', function(req, res) {
    console.log('GET Request For Home Page Received')
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.put('/', function (req, res) {
  res.send('PUT request to homepage');
  console.log('PUT Request For Home Page Received')
});

app.post('/', function (req, res) {
  res.send('POST request to homepage');
  console.log('POST Request For Home Page Received')
});


app.listen(8001);

// var http = require('http');
// var fs = require('fs');
// var path = require('path');
//
// fs.readFile('index.html', function (err, html) {
//     if (err) {
//         throw err;
//     }
//     http.createServer(function(req, res) {
//       var filePath = req.url;
//       if (filePath == '/')
//         filePath = '/index.html';
//
//       filePath = __dirname+filePath;
//       var extname = path.extname(filePath);
//       var contentType = 'text/html';
//
//       switch (extname) {
//           case '.js':
//               contentType = 'text/javascript';
//               break;
//           case '.css':
//               contentType = 'text/css';
//               break;
//           case '.woff2':
//               contentType = 'font/woff2';
//               break;
//       }
//
//       fs.exists(filePath, function(exists) {
//         if (exists) {
//           fs.readFile(filePath, function(error, content) {
//               if (error) {
//                   res.writeHead(500);
//                   res.end();
//               }
//               else {
//                   res.writeHead(200, { 'Content-Type': contentType });
//                   res.end(content, 'utf-8');
//               }
//           });
//         }
//       })
//     }).listen(8001, '127.0.0.1');
// });
