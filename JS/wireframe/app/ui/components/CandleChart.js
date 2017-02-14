import React from 'react'
import { HighChart } from 'chart'

//Stock Format : [timestamp, open, high, low, close]

export const CandleChart = React.createClass({
  propTypes: {
    // dataKey: React.PropTypes.string.isRequired,
    // indicators: React.PropTypes.array,
    candleKey: React.PropTypes.string.isRequired,
    candleData: React.PropTypes.array.isRequired
    // indicatorsData: React.PropTypes.object,   //key is indicator name
    // strategyData: React.PropTypes.array
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

  //For Indicators and Trade Data ONLY
  addOrUpdateSeries(options){
    let chart = this.chartWrapper.getHighChart()
    let series = chart.series.find(s=>s.name===options.name)
    if(!series){
      chart.addSeries(options)
    } else {
      series.update(options)
    }
  },

  removeSeries(name){
    let chart = this.chartWrapper.getHighChart()
    let series = chart.series.find(s=>s.name===name)
    if(series){
      series.remove()
    }
  },

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
    // Object.keys(this.props.indicatorsData).forEach(k=>{
    //   result.push({
    //     type: 'line',
    //     name: k,
    //     lineWidth: 1,
    //     data: this.props.indicatorsData[k]
    //   })
    // })
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
        legend: {
          enabled: true
        },
        series: this.buildSeries()
    }
    // if(this.chartWrapper){
    //   let chart = this.chartWrapper.getHighChart()
    //   chart.options = options
    //   chart.redraw()
    // }
    return <HighChart ref={c=>{this.chartWrapper=c}} chartType='stockChart' options={options}/>
  }
})
