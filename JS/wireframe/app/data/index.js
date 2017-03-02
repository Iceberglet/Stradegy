// export { AUDUSD } from './AUDUSD'
// export { BRENTCMDUSD } from './BRENTCMDUSD'
// export { EURUSD } from './EURUSD'
// export { GBPUSD } from './GBPUSD'
// export { GBRIDXGBP } from './GBRIDXGBP'
// export { HKGIDXHKD } from './HKGIDXHKD'
// export { JPNIDXJPY } from './JPNIDXJPY'
// export { NZDUSD } from './NZDUSD'
// export { USA30IDXUSD } from './USA30IDXUSD'
// export { USA500IDXUSD } from './USA500IDXUSD'
// export { USACOMIDXUSD } from './USACOMIDXUSD'
// export { USAMJRIDXUSD } from './USAMJRIDXUSD'
// export { USATECHIDXUSD } from './USATECHIDXUSD'
// export { USDJPY } from './USDJPY'
// export { USDSGD } from './USDSGD'
// export { XAGUSD } from './XAGUSD'
// export { XAUUSD } from './XAUUSD'

import * as DATA from './data'

export const getData = (key)=>{
  if(!DATA[key]){
    throw new Error('No Such Data Key: ', key)
  }
  return JSON.parse(JSON.stringify(DATA[key]))
}

export const getDataKeys = ()=>Object.keys(DATA)
