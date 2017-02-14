import React from 'react'
import * as DATA from 'app/data'
import { INDICATORS, IndicatorAPI} from 'app/logic/indicators'
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

  addIndicator(indicator){
    this.candleChart && this.candleChart.addOrUpdateSeries({
      type: 'line',
      metaType: 'indicator',
      name: IndicatorAPI.getName(indicator),
      lineWidth: 1,
      data: INDICATORS[indicator.name](...indicator.params)(DATA[this.props.dataKey])
    })
  },

  removeIndicator(indicator){
    this.candleChart && this.candleChart.removeSeries(IndicatorAPI.getName(indicator))
  },

  componentDidMount(){
    this.props.indicatorConfig && this.props.indicatorConfig.forEach(this.addIndicator)
  },

  render(){
    return (<CandleChart ref={c=>{this.candleChart = c}} candleKey={this.props.dataKey} candleData={this.getCandleData()} />)
  }
})
