const dataFolder = './data/';
const fs = require('fs');

function createHandler(){
  return {
    createOrUpdateStrategy: function(cb, name, content){
      fs.writeFile(dataFolder+name, content, cb)
    },
    readStrategyList: function(cb){
      fs.readdir(dataFolder, cb);
    },
    loadStrategy: function(cb, name){
      fs.readFile(dataFolder+name, 'utf8', cb)
    }
  }
}
var exports = module.exports = createHandler()
