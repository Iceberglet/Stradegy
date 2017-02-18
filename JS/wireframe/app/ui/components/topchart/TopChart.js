import React from 'react'
import * as DATA from 'app/data'
import { INDICATORS, IndicatorAPI} from 'app/logic/indicators'
import { CandleChart } from 'app/ui/components'

export const TopChart = React.createClass({
  propTypes: {
    dataKey: React.PropTypes.string.isRequired,
    indicatorConfig: React.PropTypes.array
  },

  refresh(){
    let indicators = this.candleChart && this.candleChart.getAllIndicators()
    if(this.candleChart){
      this.candleChart.clear()
      this.candleChart.update()
      this.addBaseSeries()
      indicators.forEach(this.addIndicator)
    }
  },

  addIndicator(indicator){
    let data = INDICATORS[indicator.name](...indicator.params)(DATA[this.props.dataKey])
    let stripped
    if(data[0].length>2){
      stripped = Array(data[0].length-1).fill([])
      data.forEach((dayData)=>{
        for(let i = 1; i < dayData.length; i++){
          let newOne = [dayData[0], dayData[i]]
          if(stripped[i-1].length===0){
            stripped[i-1] = [newOne]
          } else {
            stripped[i-1].push(newOne)
          }
        }
      })
    } else {
      stripped = [data]
    }
    stripped.forEach((s,i)=>{
      this.candleChart && this.candleChart.addOrUpdateSeries({
        type: 'line',
        metaType: 'indicator',
        // type: 'scatter',
        // marker: {
        //   enabled: false
        // },
        indicator,
        cropThreshold: 500,
        name: IndicatorAPI.getName(indicator) + (stripped.length>1?('-'+i):''),
        lineWidth: 1,
        yAxis: IndicatorAPI.separateAxis(indicator)? 1 : 0,
        data: s
      })
    })
  },

  //add or update
  addOpenLongSeries(data){
    this.candleChart && this.candleChart.addOrUpdateSeries({
      type: 'scatter',
      metaType: 'openLong',
      color: 'orange',
      marker: {
          radius: 7,
          symbol: 'triangle'
      },
      name: 'Open Long',
      data
    })
  },

  //add or update
  addOpenShortSeries(data){
    this.candleChart && this.candleChart.addOrUpdateSeries({
      type: 'scatter',
      metaType: 'openShort',
      color: 'orange',
      marker: {
          radius: 7,
          symbol: 'triangle-down'
      },
      name: 'Open Short',
      data
    })
  },

  //add or update
  addCloseSeries(data){
    this.candleChart && this.candleChart.addOrUpdateSeries({
      type: 'scatter',
      metaType: 'close',
      color: 'blue',
      marker: {
          radius: 7,
          symbol: 'circle'
      },
      name: 'Close',
      data
    })
  },

  addBaseSeries(){
    if(this.props.dataKey){
      let candleData = DATA[this.props.dataKey]
      this.candleChart && this.candleChart.addOrUpdateSeries({
        type: 'candlestick',
        metaType: 'data',
        showInNavigator: true,
        name: this.props.dataKey,
        data: candleData,
        dataGrouping: {
          units: [
              ['day', [3]],
              ['week',[1, 2]],
              ['month',[1, 3]]
          ]
        }
      })
    }
    else {
      console.error('No DataKey Defined For Stock Chart')
    }
  },

  removeIndicator(indicator){
    this.candleChart && this.candleChart.removeSeries(IndicatorAPI.getName(indicator))
  },

  componentDidMount(){
    this.addBaseSeries()
    this.props.indicatorConfig && this.props.indicatorConfig.forEach(this.addIndicator)
  },

  render(){
    return (<CandleChart ref={c=>{this.candleChart = c}} title={this.props.dataKey} />)
  }
})
