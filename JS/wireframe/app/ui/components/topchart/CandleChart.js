import React from 'react'
import { HighChart } from 'chart'

//Stock Format : [timestamp, open, high, low, close]

export const CandleChart = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },

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
    chart.series.filter(s=>s.name.startsWith(name)).forEach(s=>s.remove())
  },

  getAllIndicators(){
    let chart = this.chartWrapper.getHighChart()
    return chart.series.map(s=>s.userOptions.indicator).filter(s=>s)
  },

  clear(){
    let chart = this.chartWrapper.getHighChart()
    while(chart.series.length > 0){
      chart.series[0].remove(true);
    }
  },

  render(){
    let options = {
        rangeSelector: {
            selected: 1
        },
        title: {
            text: this.props.title
        },
        legend: {
          enabled: true
        },
        yAxis: [{ // left y axis
            title: {
                text: null
            },
            labels: {
                align: 'left',
                x: 3,
                y: 16,
                format: '{value:.,0f}'
            },
            showFirstLabel: false
        }, { // right y axis
            gridLineWidth: 0,
            opposite: false,
            title: {
                text: null
            },
            labels: {
                align: 'right',
                x: -3,
                y: 16,
                format: '{value:.,0f}'
            },
            showFirstLabel: false
        }],
        series: []
    }
    return <HighChart ref={c=>{this.chartWrapper=c}} chartType='stockChart' options={options}/>
  }
})
