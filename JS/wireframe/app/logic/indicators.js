//Function to return arrays fit for line series.
//Input is raw array from existing JS files

const isNotNull = (num)=>num!==null&&num!==undefined

export const Floor = function(n){return function(data){return data.map((d,idx)=>idx>=n-1?[d[0],Math.min(...data.slice(idx-n+1,idx+1).map(dArr=>dArr[3]))]:null).filter(isNotNull)}}

export const Ceiling = function(n){return function(data){return data.map((d,idx)=>idx>=n-1?[d[0],Math.max(...data.slice(idx-n+1,idx+1).map(dArr=>dArr[2]))]:null).filter(isNotNull)}}

export const ATR = function(n){return function(data){let atr=[];data.forEach((d, idx)=>{atr.push(idx<n-1?[d[0],Math.abs(d[2]-d[3])]:[d[0],(Math.abs(d[2]-d[3])+atr.slice(idx-n+1,idx).map(l=>l[1]).reduce((p,c)=>p+c,0))/n])});return atr.slice(n,atr.length)}}

//Average only takes in close value, i.e. l[4]
export const EMA = function(n){return function(data){let ema=[[data[n-1][0],data.slice(0,n).map(l=>l[4]).reduce((p,c)=>p+c,0)/n]];data.forEach((d,idx)=>{if(idx>=n){ema.push([d[0],(ema[idx-n][1]*(n-1)+d[4])/n])}});return ema}}

export const getName = function(obj){return obj.name+JSON.stringify(obj.params)}
