import React from 'react'
import { HighChart } from 'chart'

//Stock Format : [timestamp, open, high, low, close]

export const CandleChart = React.createClass({
  propTypes: {
    // dataKey: React.PropTypes.string.isRequired,
    // indicators: React.PropTypes.array,
    candleKey: React.PropTypes.string.isRequired,
    candleData: React.PropTypes.array.isRequired,
    indicatorsData: React.PropTypes.object,   //key is indicator name
    strategyData: React.PropTypes.array
  },

  // getInitialState(){
  //   return this.getStateFromProps(this.props)
  // },
  //
  // getStateFromProps(props){
  // },
  //
  // componentWillReceiveProps(props){
  //   this.setState(this.getStateFromProps(props))
  // },

  buildSeries(){
    let result = []
    result.push({
      type: 'candlestick',
      name: this.props.candleKey,
      data: this.props.candleData,
      dataGrouping: {
        units: [
            ['day', [3]],
            ['week',[1, 2]],
            ['month',[1, 3]]
        ]
      }
    })
    Object.keys(this.props.indicatorsData).forEach(k=>{
      result.push({
        type: 'line',
        name: k,
        data: this.props.indicatorsData[k]
      })
    })
    return result
  },

  render(){
    let options = {
        rangeSelector: {
            selected: 1
        },
        title: {
            text: this.props.candleKey
        },
        series: this.buildSeries()
    }
    return <HighChart chartType='stockChart' options={options}/>
  }
})
