var express = require('express');
var app = express();
var path = require('path');
var connection = require('./connection/mssql-connection');
var requestHandler = require('./connection/httpHandler');
var bodyParser = require('body-parser');

const removeParam = (s)=>{
  while(s.indexOf('?') > 0){
    s = s.slice(0, s.indexOf('?'))
  }
  return s
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

app.post('/test', function(request, respond) {
  let action = request.body.action

  let content = request.body.content
  if(typeof(content)==='object'){
    content = JSON.parse(content)
  }
  if(action && content && requestHandler[action]){
    let res = requestHandler[action](content)
    console.log(res)
    respond.send(res)
  } else {
    respond.status(404).send('Illegal Request')
  }

    // var body = '';
    // filePath = __dirname + '/data/';
    // request.on('data', function(data) {
    //     body += data;
    // });
});


//
// connection.saveStrategy('First', '55', '33')
//
// connection.saveStrategy('Second', '132123', '33')
//
// connection.updateStrategy('Second', '5745674', '33')


app.listen(8001);
