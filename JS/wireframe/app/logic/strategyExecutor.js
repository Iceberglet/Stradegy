
const deepClone = (o)=>JSON.parse(JSON.stringify(o))

const tryAndLog = (f)=>{
  try{
    f()
  } catch(error){
    console.error(error)
  }
}

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

//Callback object is used to emit result (time0-1, price0-1)
StrategyExecutor.prototype.run = function(strategy, configs){
  /********************** Define API ****************************/
  //Define Indicators
  let IND = {}
  Object.keys(this.indicatorDataObj).forEach((indicatorName)=>{
    // eval('let ' + indicatorName + ' = ' + this.indicatorDataObj[indicatorName])
    IND[indicatorName] = this.indicatorDataObj[indicatorName]
  })
  //Define 'current' portfolio or buySellStatus
  let portfolio = new PortfolioStatus()

  //this.data and this.indicatorDataObj[name] are of the same length now
  this.data.forEach((dayData, idx)=>{
    tryAndLog(()=>{
      eval(strategy)
    })
  })

  return portfolio.collect()
}


const PortfolioAction = function(){
}
PortfolioAction.prototype.collect = function(){
  return Object.assign({}, this)
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
    markClosePosition: function(otherPortfolio, dayData){
      let action = new PortfolioAction()
      otherPortfolio.status = 'closed'
      action.status = 'closed'
      action.type = 'close'
      action.time = dayData[0]
      action.notional = -otherPortfolio.notional
      action.price = dayData[4]
      action.pnl = otherPortfolio.notional * (dayData[4] - otherPortfolio.price)
      actionList.push(action)
      return action
    },
    getOpenPositions: function(){
      return actionList.filter(a =>a.status==='opened' && a.type==='open')
    },
    collect: function(){
      let toScatterBean = (action)=>[action.time, action.price, action.notional]
      return {
        openLong: actionList.filter(a=>a.type==='open' && a.notional > 0).map(toScatterBean),
        openShort: actionList.filter(a=>a.type==='open' && a.notional < 0).map(toScatterBean),
        close: actionList.filter(a=>a.type==='close').map(toScatterBean)
      }
    }
  }
}
