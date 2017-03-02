// action.type = 'open'
// action.status = 'opened'
// action.time = dayData[0]
// action.notional = notional
// action.price = dayData[4]
// action.pnl = otherPortfolio.notional * (dayData[4] - otherPortfolio.price)

// openLong: actionList.filter(a=>a.type==='open' && a.notional > 0),
// openShort: actionList.filter(a=>a.type==='open' && a.notional < 0),
// close: actionList.filter(a=>a.type==='close')

const millisecondsInDay = 86400000 //1000*60*60*24

export const analyse = (data, openLong, openShort, close)=>{
  let longestWin = 0, currentWin = 0;
  let longestLose = 0, currentLose = 0;
  close.forEach(c=>{
    if(c.pnl > 0){
      currentLose = 0;
      currentWin++;
      if(currentWin > longestWin){
        longestWin = currentWin;
      }
    }
    else if(c.pnl < 0){
      currentWin = 0;
      currentLose++;
      if(longestLose < currentLose){
        longestLose = currentLose;
      }
    }
  })
  return {
    longestLose, longestWin,
    //Number of trades done
    numberOfTrades: close.length,
    //Probability of winning trade
    winningProbability: close.filter(c=>c.pnl>0).length / close.length,
    //Average PnL
    averagePnL: close.reduce((pre,c)=>pre+c.pnl,0)/close.length,
    //Notional weighted duration of holding positions
    totalPositionedDuration: close.reduce((pre,c)=>Math.abs(c.notional)*(c.time-c.openPosition.time)+pre,0)/millisecondsInDay,
    //Best Trade pnl
    bestPnL: Math.max(...close.map(c=>c.pnl)),
    //Worst Trade pnl
    worstPnL: Math.min(...close.map(c=>c.pnl)),

    //Used to plot time series
    pnlSeries: close.map(c=>[c.time, c.pnl])
  }
}
