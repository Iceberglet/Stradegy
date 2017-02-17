//Function to return arrays fit for line series.
//Input is raw array from existing JS files

const isNotNull = (num)=>num!==null&&num!==undefined

export const INDICATORS = {}

INDICATORS.Floor = function(n){return function(data){return data.map((d,idx)=>idx>=n-1?[d[0],Math.min(...data.slice(idx-n+1,idx+1).map(dArr=>dArr[3]))]:null).filter(isNotNull)}}

INDICATORS.Ceiling = function(n){return function(data){return data.map((d,idx)=>idx>=n-1?[d[0],Math.max(...data.slice(idx-n+1,idx+1).map(dArr=>dArr[2]))]:null).filter(isNotNull)}}

INDICATORS.ATR = function(n){return function(data){let atr=[];data.forEach((d, idx)=>{atr.push(idx<n-1?[d[0],Math.abs(d[2]-d[3])]:[d[0],(Math.abs(d[2]-d[3])+atr.slice(idx-n+1,idx).map(l=>l[1]).reduce((p,c)=>p+c,0))/n])});return atr.slice(n,atr.length)}}

//Average only takes in close value, i.e. l[4]
// INDICATORS.EMA = function(n){return function(data){let ema=[[data[n-1][0],data.slice(0,n).map(l=>l[4]).reduce((p,c)=>p+c,0)/n]];data.forEach((d,idx)=>{if(idx>=n){ema.push([d[0],(ema[idx-n][1]*(n-1)+d[4])/n])}});return ema}}

INDICATORS.EMA = function(n){return function(data){
  let ema=[[data[n-1][0], data.slice(0,n)
                              .map(l=>l[4])
                              .reduce((p,c)=>p+c,0)/n]];
  data.forEach((d,idx)=>{
    if(idx>=n){
      ema.push([d[0],(ema[idx-n][1]*(n-1)+d[4])/n])}});
  return ema
}}


INDICATORS.ROC = function(n){
  return function(data){
    let red = []
    data.forEach((d, idx)=>{
      if(idx>=n){
        red.push([d[0], d[4]/data[idx-n][4]])
      }
    })
    red.forEach((r, idx)=>{
      if(idx>=n-1){
        r.push(red.slice(idx-n+1, idx+1).reduce((pre,cur)=>pre+cur[1],0)/n)
      }
    })
    console.log(red)

    return red.filter(r=>r[2]!==undefined)
  }
}

export const IndicatorAPI = {}

IndicatorAPI.getName = function(obj){return obj.name+JSON.stringify(obj.params)}

IndicatorAPI.equals = function(a, b){return a.name===b.name && a.params.equals(b.params)}
