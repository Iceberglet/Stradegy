var express = require('express');
var app = express();
var path = require('path');
var connection = require('./connection/mssql-connection');

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

connection.saveStrategy('First', '55', '33')

connection.saveStrategy('Second', '132123', '33')

connection.updateStrategy('Second', '5745674', '33')


app.listen(8001);
