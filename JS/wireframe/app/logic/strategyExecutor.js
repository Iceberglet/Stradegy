
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

StrategyExecutor.prototype.run = function(strategies, callBack, configs){
  let {open, close} = {...strategies}
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
    if(!portfolio.currentPosition){
      tryAndLog(function(){
        let shouldOpenAmount = eval(open)
        if(shouldOpenAmount){
          portfolio.open(dayData, shouldOpenAmount)
        }
      })
    }
    else {
      tryAndLog(()=>{
        let shouldClose = eval(close)
        if(shouldClose){
          portfolio.close(dayData, idx)
          callBack? callBack(portfolio.collect()) : console.log(portfolio.collect())
          portfolio.initialize()
        }
      })
    }
  })
}

const PortfolioStatus = function(){
}

PortfolioStatus.prototype.initialize = function(dataOffSet){
  this.currentPosition = false // + 1 or - 1?
  this.time0 = false
  this.price0 = false
  this.time1 = false
  this.price1 = false
  this.openDataIdx = false
  this.dataOffSet = dataOffSet;
}

PortfolioStatus.prototype.open = function(dayData, notional, idx){
  this.time0 = dayData[0]
  this.price0 = dayData[4]  //close price only
  this.currentPosition = notional
  this.openDataIdx = idx + this.dataOffSet
}

PortfolioStatus.prototype.close = function(dayData, notional, idx){
  this.pnl = this.currentPosition * (dayData[4] - this.price0)
  this.closeDataIdx = idx + this.dataOffSet
  this.time1 = dayData[0]
  this.price1 = dayData[4]
}

PortfolioStatus.prototype.collect = function(){
  return Object.assign({}, this)
}
