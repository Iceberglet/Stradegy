//Function to return arrays fit for line series.
//Input is raw array from existing JS files
const isNotNull = (num)=>num!==null&&num!==undefined
const average = (a)=>a.reduce((p,c)=>p+c,0)/a.length
export const INDICATORS = {}
INDICATORS.Floor = function(n){return function(data){return data.map((d,idx)=>idx>=n-1?[d[0],Math.min(...data.slice(idx-n+1,idx+1).map(dArr=>dArr[3]))]:null).filter(isNotNull)}}
INDICATORS.Ceiling = function(n){return function(data){return data.map((d,idx)=>idx>=n-1?[d[0],Math.max(...data.slice(idx-n+1,idx+1).map(dArr=>dArr[2]))]:null).filter(isNotNull)}}
// INDICATORS.ATR = function(n){return function(data){let atr=[];data.forEach((d, idx)=>{atr.push(idx<n-1?[d[0],Math.abs(d[2]-d[3])]:[d[0],(Math.abs(d[2]-d[3])+atr.slice(idx-n+1,idx).map(l=>l[1]).reduce((p,c)=>p+c,0))/n])});return atr.slice(n,atr.length)}}

INDICATORS.ATR = function(n){
  let TR = (d,p)=>Math.max(d[2]-d[3],Math.abs(d[2]-p[4]),Math.abs(d[3]-p[4]))
  return function(data){
    let atr = [[data[n-1][0], data.slice(0,n).map(d=>d[2]-d[3]).reduce((p,c)=>p+c,0)/(n)]]
    data.slice(n).forEach((d,i)=>{
      let dataIdx = i+n
      let prev = atr[i][1]
      atr.push([d[0], (TR(d,data[dataIdx-1])+prev*(n-1))/n])
    })
    return atr
  }
}

INDICATORS['ATR%'] = function(n){
  let TR = (d,p)=>Math.max(d[2]-d[3],Math.abs(d[2]-p[4]),Math.abs(d[3]-p[4]))
  return function(data){
    let atr = [[data[n-1][0], data.slice(0,n).map(d=>d[2]-d[3]).reduce((p,c)=>p+c,0)/(n)/data[n-1][4]]]
    data.slice(n).forEach((d,i)=>{
      let prev = atr[i][1]
      let prevD = data[i+n-1]
      atr.push([d[0], (TR(d,prevD)+prev*(n-1)*prevD[4])/n/d[4]])
    })
    return atr.map(a=>[a[0],a[1]*10000])
  }
}

INDICATORS.EMA = function(n){return function(data){let ema=[[data[n-1][0],data.slice(0,n).map(l=>l[4]).reduce((p,c)=>p+c,0)/n]];data.forEach((d,idx)=>{if(idx>=n){ema.push([d[0],(ema[idx-n][1]*(n-1)+d[4])/n])}});return ema}}
INDICATORS.MACD = function(s,m,l){return function(data){let ema1 = INDICATORS.EMA(m)(data).slice(l-m);let ema2 = INDICATORS.EMA(l)(data);let macd = ema1.map((d,i)=>[d[0],d[1]-ema2[i][1]]);let la = macd.slice(0,s).reduce((p,c)=>p+c[1],0)/s;macd[s-1][2]=la;macd.slice(s).forEach((mm)=>{mm[2]=(la*(s-1)+mm[1])/s;la=mm[2];});return macd.filter(mm=>mm[2]!==undefined)}}
INDICATORS.ROC = function(n){return function(data){let red = [];data.forEach((d, idx)=>{if(idx>=n){let p=data[idx-n][4];red.push([d[0], (d[4]-p)/p])}});red.forEach((r, idx)=>{if(idx>=n-1){r.push(red.slice(idx-n+1, idx+1).reduce((pre,cur)=>pre+cur[1],0)/n)}});return red.filter(r=>r[2]!==undefined)}}
INDICATORS.RSI = function(n){return function(data){let U=[],D=[],rs=[];U.push(data.slice(0,n).reduce((p,c)=>p+Math.max(c[4]-c[1],0),0)/n);D.push(data.slice(0,n).reduce((p,c)=>p+Math.max(c[1]-c[4],0),0)/n);data.slice(n).forEach((d,idx)=>{let x=(U[idx]*(n-1)+Math.max(d[4]-d[1],0))/n;let y=(D[idx]*(n-1)+Math.max(d[1]-d[4],0))/n;U.push(x);D.push(y);rs.push([d[0],x/y])});return rs.map(a=>[a[0],1-1/(1+a[1])])}}
export const IndicatorAPI = {}
IndicatorAPI.getName = function(obj){return obj.name+JSON.stringify(obj.params)}
IndicatorAPI.equals = function(a, b){return a.name===b.name && a.params.equals(b.params)}
IndicatorAPI.separateAxis = function(indicator){return ['ROC', 'MACD', 'RSI', 'ATR', 'ATR%'].indexOf(indicator.name)>-1}
