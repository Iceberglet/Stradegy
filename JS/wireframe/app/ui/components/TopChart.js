import React from 'react'
import * as DATA from 'app/data'
import * as INDICATOR from 'app/logic/indicators'
import { CandleChart } from 'app/ui/components'

export const TopChart = React.createClass({
  propTypes: {
    dataKey: React.PropTypes.string.isRequired,
    indicatorConfig: React.PropTypes.array
  },

  getCandleData(){
    if(DATA[this.props.dataKey]){
      return DATA[this.props.dataKey]
    } else {
      console.error('Unable to find data of type: ', this.props.dataKey, 'Existing Data Obj: ', DATA)
    }
  },

  getIndicatorData(){
    let result = {}, c = this.props.indicatorConfig
    if(!c || c.length === 0){
      return result
    }
    c.forEach(i=>{
      let {name, params} = {...i}
      result[name+JSON.stringify(params)] = INDICATOR[name](...params)(DATA[this.props.dataKey])
    })
    return result
  },

  render(){
    return (<CandleChart candleKey={this.props.dataKey} candleData={this.getCandleData()} indicatorsData={this.getIndicatorData()}/>)
  }
})
