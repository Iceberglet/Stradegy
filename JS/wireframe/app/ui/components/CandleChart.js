import React from 'react'
import { HighChart } from 'chart'
import * as DATA from 'app/data'
import * as INDICATOR from 'app/logic/indicators'

//Stock Format : [timestamp, open, high, low, close]

export const CandleChart = React.createClass({
  propTypes: {
    dataKey: React.PropTypes.string.isRequired,
    indicators: React.PropTypes.array
  },

  getInitialState(){
    return this.getStateFromProps(this.props)
  },

  getStateFromProps(props){
    if(DATA[props.dataKey]){
      return {
        title: props.dataKey,
        data: DATA[props.dataKey]
      }
    } else {
      console.error('Unable to find data of type: ', props.dataKey, 'Existing Data Obj: ', DATA)
    }
  },

  componentWillReceiveProps(props){
    this.setState(this.getStateFromProps(props))
  },

  buildSeries(){
    let result = []
    result.push({
      type: 'candlestick',
      name: this.state.title,
      data: this.state.data,
      dataGrouping: {
        units: [
            [
                'week', // unit name
                [1] // allowed multiples
            ], [
                'month',
                [1, 2, 3, 4, 6]
            ]
        ]
      }
    })
    this.props.indicators.forEach(({name, params})=>{
      result.push({
        type: 'line',
        name: name+JSON.stringify(params),
        data: INDICATOR[name](...params)(this.state.data)
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
            text: this.state.title
        },
        series: this.buildSeries()
    }
    return <HighChart chartType='stockChart' options={options}/>
  }
})
