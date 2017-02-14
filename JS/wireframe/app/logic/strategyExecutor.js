
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

  Object.values(this.indicatorDataObj).forEach(ind=>{
    while(this.data[0][0] < ind[0][0]){
      this.data.shift()
    }
  })
  Object.values(this.indicatorDataObj).forEach(ind=>{
    while(this.data[0][0] > ind[0][0]){
      ind.shift()
    }
  })
  console.log(this.data.length, ...Object.values(this.indicatorDataObj).map(d=>d.length))
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
  let currentPosition = false // + 1 or - 1?
  let positionEnterTime = false
  let positionEnterPrice = false

  //this.data and this.indicatorDataObj[name] are of the same length now
  this.data.forEach((dayData, idx)=>{
    if(!currentPosition){
      tryAndLog(function(){
        let shouldOpenAmount = eval(open)
        if(shouldOpenAmount){
          positionEnterTime = dayData[0]
          positionEnterPrice = dayData[4]
          currentPosition = shouldOpenAmount
        }
      })
    }
    else {
      tryAndLog(()=>{
        let shouldClose = eval(close)
        if(shouldClose){
          let pnl = currentPosition * (dayData[4] - positionEnterPrice)
          let obj = {
            time1: positionEnterTime,
            price1: positionEnterPrice,
            time2: dayData[0],
            price2: dayData[4],
            pnl
          }
          callBack? callBack(obj) : console.log(obj)
          currentPosition = false // + 1 or - 1?
          positionEnterTime = false
          positionEnterPrice = false
        }
      })
    }
  })
}
