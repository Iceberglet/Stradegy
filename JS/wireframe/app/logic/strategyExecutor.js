
const deepClone = (o)=>JSON.parse(JSON.stringify(o))

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

StrategyExecutor.prototype.run = function(strategy){

}


export const Strategy = function(buyIndicatorFunc, buyAmountFunc, stopLossFunc, takeProfitFunc){

}
