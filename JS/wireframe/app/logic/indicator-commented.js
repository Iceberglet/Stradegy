// INDICATORS.RSI = function(n){
//   return function(data){
//     let U = [], D = [], rs = []
//     U.push(data.slice(0,n).reduce((p,c)=>p+Math.max(c[4]-c[1],0),0)/n)
//     D.push(data.slice(0,n).reduce((p,c)=>p+Math.max(c[1]-c[4],0),0)/n)
//     data.slice(n).forEach((d,idx)=>{
//       let newU = (U[idx]*(n-1)+Math.max(d[4]-d[1],0))/n
//       let newD = (D[idx]*(n-1)+Math.max(d[1]-d[4],0))/n
//       U.push(newU)
//       D.push(newD)
//       rs.push([d[0],newU/newD])
//     })
//     return rs.map(a=>[a[0],1-1/(1+a[1])])
//   }
// }


// INDICATORS.ROC = function(n){
//   return function(data){
//     let red = []
//     data.forEach((d, idx)=>{
//       if(idx>=n){
//         let p=data[idx-n][4]
//         red.push([d[0], (d[4]-p)/p])
//       }
//     })
//     red.forEach((r, idx)=>{
//       if(idx>=n-1){
//         r.push(red.slice(idx-n+1, idx+1).reduce((pre,cur)=>pre+cur[1],0)/n)
//       }
//     })
//     red = red.filter(r=>r[2]!==undefined)
//     return red
//   }
// }



//Input: Short, Middle, Long
// INDICATORS.MACD = function(s,m,l){
//   return function(data){
//     let ema1 = INDICATORS.EMA(m)(data).slice(l-m);
//     let ema2 = INDICATORS.EMA(l)(data);
//     let macd = ema1.map((d,i)=>[d[0],d[1]-ema2[i][1]]);
//     let la = macd.slice(0,s).reduce((p,c)=>p+c[1],0)/s;
//     macd[s-1][2]=la;
//     macd.slice(s).forEach((mm)=>{mm[2]=(la*(s-1)+mm[1])/s;la=mm[2];})
//     return macd.filter(mm=>mm[2]!==undefined)
//   }
// }
