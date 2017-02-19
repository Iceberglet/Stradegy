var express = require('express');
var app = express();
var path = require('path');
// var connection = require('./connection/mssql-connection');
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
  // console.log('GET Request For Wireframe Received')
  res.sendFile(p);
});

app.get('/app/*', function(req, res) {
  let p =removeParam(path.join(__dirname + req.url))
  // console.log('GET Request For App Received')
  res.sendFile(p);
});

app.get('/', function(req, res) {
    // console.log('GET Request For Home Page Received')
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.post('/portal', function(request, respond) {
  try{
    let action = request.body.action
    let args = request.body.args
    // console.log(args)
    if(typeof(args)==='string'){
      args = JSON.parse(unescape(request.body.args))
    }
    if(!args || typeof args[Symbol.iterator] !== 'function'){
      console.error(action, args)
      throw new Error('Invalid Args')
    }
    if(action && arguments && requestHandler[action]){
      requestHandler[action]((err, result)=>{
        if(err){
          throw err
        }
        respond.send(result)
      }, ...args)
    }
  } catch(err) {
    console.error(err)
    respond.status(404).send(err)
  }
});

app.listen(8001);
