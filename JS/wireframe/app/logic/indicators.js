//Function to return arrays fit for line series.
//Input is raw array from existing JS files

const isNotNull = (num)=>num!==null&&num!==undefined

export const Floor = function(numberOfDays){
  return function(data){
    return data.map((dayData, idx)=>idx >= numberOfDays - 1?
      [dayData[0],Math.min(...data.slice(idx - numberOfDays+1, idx+1).map(dArr=>dArr[4]))]:null
    ).filter(isNotNull)
  }
}

export const Ceiling = function(numberOfDays){
  return function(data){
    return data.map((dayData, idx)=>idx >= numberOfDays - 1?
      [dayData[0],Math.max(...data.slice(idx - numberOfDays+1, idx+1).map(dArr=>dArr[4]))]:null
    ).filter(isNotNull)
  }
}
