
const deepClone = (o)=>JSON.parse(JSON.stringify(o))

//IMPORTANT ASSUMPTION: All indicators have continuous evaluations.
//i.e. From a certain point onwards, each data point will have a unique indicator value point for each of the indicators associated
export const StrategyExecutor = function(data, indicatorDataObj){
  this.data = deepClone(data);
  this.indicatorDataObj = deepClone(indicatorDataObj);
  this.dataOffSet = 0;

  Object.values(this.indicatorDataObj).forEach(ind=>{
    while(this.data[0][0] < ind[0][0]){
      this.data.shift()
      this.dataOffSet = this.dataOffSet + 1
    }
  })
  Object.values(this.indicatorDataObj).forEach(ind=>{
    while(this.data[0][0] > ind[0][0]){
      ind.shift()
    }
  })
  //Now all data and indicators have same length and starting point!
}

export const extractIndicatorList = function(strategy){
  let startIdx = strategy.search('#REF') + 5
  let endIdx = strategy.search('#END') - 4
  let requested = []
  let request = (name, params)=>requested.push({name, params})
  let str = strategy.substr(startIdx, endIdx)
  eval(str)
  return requested
}

//Callback object is used to emit result (time0-1, price0-1)
StrategyExecutor.prototype.run = function(strategy){
  /********************** Define API ****************************/
  //Define Indicators
  let IND = {}
  Object.keys(this.indicatorDataObj).forEach((indicatorName)=>{
    // eval('let ' + indicatorName + ' = ' + this.indicatorDataObj[indicatorName])
    IND[indicatorName] = this.indicatorDataObj[indicatorName]
  })
  //Define 'current' portfolio or buySellStatus
  let portfolio = new PortfolioStatus()
  let scope = {}, history = this.data

  let str = strategy.substr(strategy.search('#END') + 4)
  //this.data and this.indicatorDataObj[name] are of the same length now
  this.data.forEach((dayData, idx)=>{
    try{
      eval(str)
      //******************************** TESTING GROUND **************************************

      //******************************** TESTING GROUND **************************************
    }catch(err){
      console.log(err)
      return
    }
  })

  return portfolio.collect()
}


const PortfolioAction = function(){
}
PortfolioAction.prototype.collect = function(){
  return Object.assign({}, this)
}
PortfolioAction.prototype.triggerStopLoss = function(price){
  if(!this.stopLoss){
    return false;
  } else {
    return (this.notional>0?price<this.stopLoss:price>this.stopLoss)
  }
}

const PortfolioStatus = function(){
  let actionList = []
  return {
    markOpenPosition: function(notional, dayData){
      let action = new PortfolioAction()
      action.type = 'open'
      action.status = 'opened'
      action.time = dayData[0]
      action.notional = notional
      action.price = dayData[4]
      actionList.push(action)
      return action
    },
    markClosePosition: function(openPosition, dayData){
      let action = new PortfolioAction()
      openPosition.status = 'closed'
      action.status = 'closed'
      action.type = 'close'
      action.time = dayData[0]
      action.notional = -openPosition.notional
      action.price = dayData[4]
      action.pnl = openPosition.notional * (dayData[4] - openPosition.price)
      action.openPosition = openPosition
      actionList.push(action)
      return action
    },
    getOpenPositions: function(){
      return actionList.filter(a =>a.status==='opened' && a.type==='open')
    },
    collect: function(){
      return {
        openLong: actionList.filter(a=>a.type==='open' && a.status==='closed' && a.notional > 0),
        openShort: actionList.filter(a=>a.type==='open' && a.status==='closed' && a.notional < 0),
        close: actionList.filter(a=>a.type==='close')
      }
    }
  }
}
