function createHandler(){
  return {
    createOrUpdateStrategy: function(strategy){

    },
    readStrategyList: function(){

    },
    loadStrategy: function(name){
      console.log('Looking For Strategy '+name+' Huh?')
      return {
        name, content: 'dummy'
      }
    }
  }
}
var exports = module.exports = createHandler()
