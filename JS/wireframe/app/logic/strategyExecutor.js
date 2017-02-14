
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
  let allReady = false;
  while(!allReady){
    let startingTime = this.data[0][0]
    //check indicator's first timeStamp
    if(Object.values(this.indicatorDataObj).every(d=>d[0][0]===startingTime)){
      allReady = true
    } else {
      this.data.shift()
      Object.values(this.indicatorDataObj).forEach(d=>{
        while(d[0][0] < startingTime){
          d.shift()
        }
      })
    }
  }
  console.log(this.data.length, ...Object.values(this.indicatorDataObj).map(d=>d.length))
  //Now all data and indicators have same length and starting point!
}

StrategyExecutor.prototype.run = function(strategies, configs, callBack){
  let {open, openAmount, close} = {...strategies}
  /********************** Define API ****************************/
  //Define Indicators
  Object.keys(this.indicatorDataObj).forEach((indicatorName)=>{
    eval('let ' + indicatorName + ' = ' + this.indicatorDataObj[indicatorName])
  })
  //Define 'current' portfolio or buySellStatus
  let currentPosition = false // + 1 or - 1?
  let positionEnterTime = false
  let positionEnterPrice = false

  //this.data and this.indicatorDataObj[name] are of the same length now
  this.data.forEach((dayData, idx)=>{
    if(!currentPosition){
      tryAndLog(function(){
        let shouldOpen = eval(open)
        if(shouldOpen){
          tryAndLog(function(){
            positionEnterTime = dayData[0]
            positionEnterPrice = dayData[4]
            currentPosition = eval(openAmount)
          })
        }
      })
    }
    else {
      tryAndLog(()=>{
        let shouldClose = eval(close)
        if(shouldClose){
          let pnl = currentPosition * (dayData[4] - positionEnterPrice)
          callBack({
            time1: positionEnterTime,
            price1: positionEnterPrice,
            time2: dayData[0],
            price2: dayData[4],
            pnl
          })
          currentPosition = false // + 1 or - 1?
          positionEnterTime = false
          positionEnterPrice = false
        }
      })
    }
  })
}
